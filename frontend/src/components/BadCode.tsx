case 'departments':
        return (
          <div className="relative w-full h-full">
            <p className="text-xl">Select Store Department</p>
            <button
              type="button"
              onClick={() => setIsDeptOpen(prev => !prev)}
              className="w-full border-b p-2 bg-[#0000000e] focus:bg-[#00000030] focus:outline-none focus:ring-0 focus:border-b text-left mt-30" 
            > 
              {form.departments[0]  //@ts-ignore
                ? departments[form.departments[0]].full
                : "Select Department"}
            </button>
            <AnimatePresence>
              {isDeptOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-47 mt-1 w-full bg-white border rounded shadow max-h-[250px] overflow-y-auto z-10"
                >
                  {Object.entries(departments).map(([key, { full, description }]) => (
                    <li
                      key={key}
                      onClick={() => handleDepartmentChange(key)}
                      className={`p-2 hover:bg-gray-100 cursor-pointer ${
                        form.departments[0] === key ? 'bg-gray-200' : ''
                      }`}
                    >
                      <p className="font-medium">{full}</p>
                      <p className="text-xs text-gray-500">{description}</p>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );        
      
        case 'contact':
          return (
            <div className="space-y-4">
              <p className="absolute top-0 text-xl w-full text-center">Contact Details</p>
              <div>
                <input
                  type="text"
                  placeholder="Phone"
                  className={`w-full border p-2 ${!validation.phoneValid ? 'border-red-500' : ''}`}
                  value={form.contact.phone || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    const updatedForm = {
                      ...form,
                      contact: {
                        ...form.contact,
                        phone: value
                      }
                    };
                    setForm(updatedForm);
                    setValidation(validateContact(updatedForm.contact.phone, updatedForm.contact.email));
                  }}
                />
                {!validation.phoneValid && (
                  <p className="text-red-500 text-sm">Enter a valid phone number (10 digits)</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full border p-2 ${!validation.emailValid ? 'border-red-500' : ''}`}
                  value={form.contact.email || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    const updatedForm = {
                      ...form,
                      contact: {
                        ...form.contact,
                        email: value
                      }
                    };
                    setForm(updatedForm);
                    setValidation(validateContact(updatedForm.contact.phone, updatedForm.contact.email));
                  }}
                />
                {!validation.emailValid && (
                  <p className="text-red-500 text-sm">Enter a valid email address</p>
                )}
              </div>
            </div>
          );




const Scibbler = () => {
    return (
      <div className="h-screen w-screen bg-amber-50 flex flex-row justify-center font-[Fira Sans]">
        <div className="relative w-[60%] h-full bg-white p-2">
          {/* Stuff */}
          <div className="flex flex-col text-center space-y-6">
            {/* Logo */}
            <div className="w-full flex flex-row justify-center">
              <img src="https://storage.googleapis.com/the-mall-uploads-giza/stores/684c15bca0f98a1d13a7ff00/images/W3Schools_logo.svg.png" 
                alt="" 
                className="h-20"
              />
            </div>
  
            {/* Certification of Completion */}
            <div className="capitalize text-5xl font-bold ">
                CERTIFICATE OF COMPLETION
            </div>
            <p className="mt-2">This certifies that</p>
            <div className="capitalize text-3xl font-bold ">
                Banele Braine Hlela
            </div>
            <p className="">has passed the w3Schools AWS ML certification and is hereby declared a</p>
            <div className="capitalize text-3xl font-bold ">
                Certified AWS ML Specialist
            </div>
            <div className="w-full flex flex-row justify-center z-10">
              <img src="https://storage.googleapis.com/the-mall-uploads-giza/stores/684c15bca0f98a1d13a7ff00/images/PP.png" 
                alt="" 
                className="h-30"
              />
            </div>
            <p className="">The candidate has passed the exam at the Proffesional level</p>
            <p className="text-sm">Issed on June 09, 2025</p>
          </div>
          {/* Verify */}
          <div className="absolute bottom-4 left-4">
            Verify completion at https://verify.w3schools.com/IOMS9V3TXTY
          </div>
          {/* Signature */}
          <div className="absolute bottom-4 right-4 leading-4 text-end">
            <div className="border-b-1 w-50">
              <img src="https://storage.googleapis.com/the-mall-uploads-giza/stores/684c15bca0f98a1d13a7ff00/images/PP3.png" alt="" className="" />
              
            </div>
            <p className="">Stephen Morgan</p>
            <p className="">For AW3 Schools</p>
          </div>
          {/* Background */}
          <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center opacity-20">
            <img src="https://storage.googleapis.com/the-mall-uploads-giza/stores/684c15bca0f98a1d13a7ff00/images/BrandLogo.org-W3Schools-Icon-2020.png" 
              alt="" 
              className="w-[80%]"
              />
          </div>
        </div>
      </div> 
    )
  }
  
  export default Scibbler