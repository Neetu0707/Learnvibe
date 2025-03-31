--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: json_files; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.json_files (
    id integer NOT NULL,
    file_name text NOT NULL,
    file_data jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.json_files OWNER TO neondb_owner;

--
-- Name: json_files_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.json_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.json_files_id_seq OWNER TO neondb_owner;

--
-- Name: json_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.json_files_id_seq OWNED BY public.json_files.id;


--
-- Name: usercourse; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.usercourse (
    id integer NOT NULL,
    user_email text NOT NULL,
    course_id text,
    status text NOT NULL,
    completed integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT usercourse_status_check CHECK ((status = ANY (ARRAY['in-progress'::text, 'completed'::text, 'pending'::text])))
);


ALTER TABLE public.usercourse OWNER TO neondb_owner;

--
-- Name: usercourse_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.usercourse_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usercourse_id_seq OWNER TO neondb_owner;

--
-- Name: usercourse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.usercourse_id_seq OWNED BY public.usercourse.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role character varying(50) DEFAULT 'user'::character varying,
    isverified boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: json_files id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.json_files ALTER COLUMN id SET DEFAULT nextval('public.json_files_id_seq'::regclass);


--
-- Name: usercourse id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.usercourse ALTER COLUMN id SET DEFAULT nextval('public.usercourse_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: json_files; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.json_files (id, file_name, file_data, created_at) FROM stdin;
\.


--
-- Data for Name: usercourse; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.usercourse (id, user_email, course_id, status, completed, created_at) FROM stdin;
48	neetusahu0707@gmail.com	Python Programming Masterclass	in-progress	4	2025-03-26 12:26:45.270823
49	neetusahu0707@gmail.com	Java Programming Masterclass	in-progress	9	2025-03-26 12:27:03.038047
46	neetusahu0707@gmail.com	C++ Programming Masterclass	in-progress	5	2025-03-26 10:10:34.028275
47	neetusahu0707@gmail.com	React.js Masterclass	in-progress	5	2025-03-26 12:26:31.507697
45	kashyaphemantk@gmail.com	C++ Programming Masterclass	in-progress	6	2025-03-26 08:31:53.338196
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, name, email, role, isverified, created_at, updated_at) FROM stdin;
1	HEMANT Kashyap	kashyaphemantk@gmail.com	admin	t	2025-03-24 16:11:40.186092	2025-03-24 16:11:40.33298
3	Neetu Sahu	neetusahu0707@gmail.com	admin	t	2025-03-24 16:55:58.617191	2025-03-24 16:55:58.700831
4	Pragya Borse	pragyaborse@gmail.com	user	f	2025-03-25 07:40:02.64305	2025-03-25 07:40:02.735715
2	HEMANT KUMAR KASHYAP	kashyaphemant2004@gmail.com	user	t	2025-03-24 16:28:13.977498	2025-03-24 16:28:14.061425
\.


--
-- Name: json_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.json_files_id_seq', 1, false);


--
-- Name: usercourse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.usercourse_id_seq', 49, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: json_files json_files_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.json_files
    ADD CONSTRAINT json_files_pkey PRIMARY KEY (id);


--
-- Name: usercourse usercourse_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.usercourse
    ADD CONSTRAINT usercourse_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: usercourse usercourse_user_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.usercourse
    ADD CONSTRAINT usercourse_user_email_fkey FOREIGN KEY (user_email) REFERENCES public.users(email) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

