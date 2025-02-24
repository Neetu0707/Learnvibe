import React , {useState} from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload/sendemail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form fields
      } else {
        alert(result.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
     <section id="support" class="scroll mt-17">
      <div class="max-w-[1104px] mx-auto px-4 sm:px-8 xl:px-0">
        <div class="relative z-[40] overflow-hidden rounded-[30px] bg-dark pt-25 px-4 sm:px-20 lg:px-27.5">
          {/* <!-- grid row --> */}
          <div class="flex justify-center gap-7.5 absolute left-1/2 -translate-x-1/2 -top-[16%] max-w-[690px] w-full -z-1 opacity-40">
            <div class="max-w-[50px] w-full h-[250px] relative pricing-grid pricing-grid-border bottom-12">
            </div>
            <div class="max-w-[50px] w-full h-[250px] relative pricing-grid pricing-grid-border bottom-7">
            </div>
            <div class="max-w-[50px] w-full h-[250px] relative pricing-grid pricing-grid-border bottom-3">
            </div>
            <div class="max-w-[50px] w-full h-[250px] relative pricing-grid pricing-grid-border">
            </div>
            <div class="max-w-[50px] w-full h-[250px] relative pricing-grid pricing-grid-border">
            </div>
            <div class="max-w-[50px] w-full h-[250px] relative pricing-grid pricing-grid-border">
            </div>
            <div class="max-w-[50px] w-full h-[250px] relative pricing-grid pricing-grid-border bottom-2">
            </div>
            <div class="max-w-[50px] w-full h-[250px] relative pricing-grid pricing-grid-border bottom-5">
            </div>
            <div class="max-w-[50px] w-full h-[250px] relative pricing-grid pricing-grid-border bottom-8">
            </div>
          </div>

          {/* <!-- stars --> */}
          <div class="max-w-[482px] w-full h-60 overflow-hidden absolute -z-1 -top-30 left-1/2 -translate-x-1/2">
            <div class="stars"></div>
            <div class="stars2"></div>
          </div>

          {/* <!-- bg shapes --> */}
          <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
            <span class="absolute left-1/2 top-0 -translate-x-1/2 -z-1">
              <img src="images/blur-19.svg" alt="blur" class="max-w-none"/>
            </span>
            <span class="absolute left-1/2 top-0 -translate-x-1/2 -z-1">
              <img src="images/blur-20.svg" alt="blur" class="max-w-none"/>
            </span>
            <span class="absolute left-1/2 top-0 -translate-x-1/2 -z-1">
              <img src="images/blur-21.svg" alt="blur" class="max-w-none"/>
            </span>
          </div>

          {/* <!-- section title --> */}
          <div class="wow fadeInUp mb-16 text-center relative z-999" style={{ visibility: 'visible' }}>
            <span class="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-4.5 rounded-full">
              <img src="images/icon-title.svg" alt="icon"/>

              <span class="hero-subtitle-text"> Need Any Help? </span>
            </span>
            <h2 class="text-white mb-4.5 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
              Contact With Us
            </h2>
            <p class="max-w-[714px] mx-auto font-medium">
              
            </p>
          </div>

          {/* <!-- support form --> */}
          <div class="form-box-gradient relative overflow-hidden rounded-[25px] bg-dark p-6 sm:p-8 xl:p-15">
            <form class="relative z-10" onSubmit={handleSubmit}>
              <div class="-mx-4 xl:-mx-10 flex flex-wrap">
                <div class="w-full px-4 xl:px-5 md:w-1/2">
                  <div class="mb-9.5">
                    <label for="name" class="text-white mb-2.5 block font-medium">
                      Name
                    </label>
                    <input id="name" type="text" name="name" placeholder="Enter your Name"
                     value={formData.name}
                     onChange={handleChange} class="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-none"/>
                  </div>
                </div>
                <div class="w-full px-4 xl:px-5 md:w-1/2">
                  <div class="mb-9.5">
                    <label for="email" class="text-white mb-2.5 block font-medium">
                      Email
                    </label>
                    <input id="email" type="email" name="email"
                     value={formData.email}
                     onChange={handleChange}
                      placeholder="Enter your Email" class="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-none"/>
                  </div>
                </div>
                <div class="w-full px-4 xl:px-5">
                  <div class="mb-10">
                    <label for="message" class="text-white mb-2.5 block font-medium">
                      Message
                    </label>
                    <textarea id="message" name="message"
                    value={formData.message}
                    onChange={handleChange} placeholder="Type your message" rows="6" class="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-5 px-6 outline-none"></textarea>
                  </div>
                </div>
                <div class="w-full px-4 xl:px-5">
                  <div class="text-center">
                    <button  type="submit"
                      className="hero-button-gradient inline-flex rounded-lg py-3 px-7 text-white font-medium ease-in duration-300 hover:opacity-80"
                    >Send Message
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section> 
    </>
  )
}

export default Contact
