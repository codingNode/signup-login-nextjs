"use client"

import React from 'react'
import { Formik, Form, Field } from 'formik';


export const getServerSideProps = async () => {
    return {
      props: {}
    };
  };



function Login() {

    const initialValues = {
        email: '',
        password: '',
      };

    
      const onSubmit = async(values, { setSubmitting }) => {
        // Handle form submission here
        console.log(values);
        try{
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          });

         
          const resData= await response.json()
          resData && (resData.password = '')
          

          response.ok ? alert(`Congratulations ${resData.username} You are successfully logged In.`) : alert(resData.message)
        }
        catch(error)
        {
          console.log(error)
        }


        setSubmitting(false);
      };


  return (
    <main className='flex flex-col min-h-screen items-center space-y-10 p-20 bg-image'>
        <div className=' text-[#000000] text-4xl font-bold stroke-text'>Login Here</div>
        <div className='bg-white bg-opacity-90 rounded-md border-2 border-gray-300 p-10'>
            
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                      <Form className='space-y-6'>
                      

                          <div className='grid grid-cols-5 items-center gap-2'>
                              <label className='col-start-1 col-span-2 text-xl font-semibold text-[#808080]' htmlFor="email">Email</label>
                              <Field className="col-start-3 col-span-3 border-2 bg-slate-100 rounded-full h-10 p-2 focus:outline-none  focus:border-gray-400" type="email" name="email" />
                          </div>


                          
                          <div className='grid grid-cols-5 items-center gap-2'>
                              <label className='col-start-1 col-span-2 text-xl font-semibold text-[#808080]' htmlFor="password">Password</label>
                              <Field className="col-start-3 col-span-3 border-2 bg-slate-100 rounded-full h-10 p-2 focus:outline-none  focus:border-gray-400" type="password" name="password" />
                          </div>
                          
                        <div className='grid grid-cols-1 place-items-center	'>
                        <button className='bg-gray-600 rounded-full text-white p-1 w-24' type="submit" disabled={isSubmitting}>
                          <p className='text-sm font-semibold'>Submit</p>
                        </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                
            

    </div>

    </main>
    
  )
}

export default Login