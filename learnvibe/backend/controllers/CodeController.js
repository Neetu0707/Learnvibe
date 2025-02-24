import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { fileURLToPath } from "url";

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const code = async (req, res) => {
    try {
        const { code, language } = req.body;
        if (!code || !language) {
            return res.status(400).json({ error: "Code and language are required" });
        }

        
console.log("Running code in", language);

        console.log("Code:", code);
        
        let filename, filePath, command;

        // Define commands for different languages
        switch (language) {
            case "CPP":
                filename = "temp.cpp";
                filePath = path.resolve(__dirname, filename);
                command = process.platform === "win32" 
                    ? `g++ ${filePath} -o temp.exe && temp.exe` 
                    : `g++ ${filePath} -o temp && ./temp`;
                break;
            case "Python":
                filename = "temp.py";
                filePath = path.resolve(__dirname, filename);
                command = process.platform === "win32" ? `python ${filePath}` : `python3 ${filePath}`;
                break;                
            case "JavaScript":
                filename = "temp.js";
                filePath = path.resolve(__dirname, filename);
                command = `node ${filePath}`;
                break;
            default:
                return res.status(400).json({ error: "Unsupported language" });
        }

        
        // Write code to a file
        await writeFile(filePath, code);

        // Execute the code
        exec(command, async (error, stdout, stderr) => {
            await unlink(filePath); // Delete temp file after execution
            if (error) {
                return res.status(400).json({ error: stderr || error.message });
            }
            res.status(200).json({ output: stdout });
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
