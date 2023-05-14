"use client"

import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';




export const getServerSideProps = async () => {
    return {
      props: {}
    };
  };

export const metadata = {
  title: 'Sign Up'
}

const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  username: Yup.string().matches(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!")
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid Email Address')
  .required('Required'),
  password: Yup.string()
  .matches(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}|\\[\]';:/?.,<>`~])(?=.{8,})[a-zA-Z0-9!@#$%^&*()_+={}|\\[\]';:/?.,<>`~]*$/,
    'Password must contain at least 8 characters, one uppercase letter, and one special character'
  )
  .required('Password is required')
});



function Signup() {

    const initialValues = {
        firstname: '',
        lastname: '',
        username:'',
        email: '',
        password: '',
      };

    
      const onSubmit = async (values, { setSubmitting }) => {
        // Handle form submission here
        console.log(values);
        try{
          const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          });

          response.ok ? alert("congratulation ! You have been signed up successfully"): alert("Sorry! something went wrong")

        }
        catch(error)
        {
          console.log(error)
        }
        setSubmitting(false);
      };


  return (
    <main className='flex flex-col min-h-screen items-center justify-between p-20 bg-image'>
        <div className='mb-6 text-[#000000] text-4xl font-bold stroke-text'>Signup Form</div>
        <div className='bg-white bg-opacity-90 rounded-md border-2 border-gray-300 p-10'>
            
                    <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={onSubmit}>
                    {({ isSubmitting, errors, touched }) => (
                      <Form className='space-y-6'>
                      
                          <div className='grid grid-cols-5 items-center gap-2'>
                              <label className='col-start-1 col-span-2 text-xl font-semibold text-[#808080]' htmlFor="firstname">First Name</label>
                              <Field className="col-start-3 col-span-3 border-2 bg-slate-100 rounded-full h-10 p-2 focus:outline-none  focus:border-gray-400" type="text" name="firstname" />
                              {errors.firstname && touched.firstname ? (
                                  <div className='text-[#FF0000] text-xs'>{errors.firstname}</div>
                                ) : null}
                          </div>

                          <div className='grid grid-cols-5 items-center gap-2'>
                              <label className='col-start-1 col-span-2 text-xl font-semibold text-[#808080]' htmlFor="lastname">Last Name</label>
                              <Field className="col-start-3 col-span-3 border-2 bg-slate-100 rounded-full h-10 p-2 focus:outline-none  focus:border-gray-400" type="text" name="lastname" />
                              {errors.lastname && touched.lastname ? (
                                  <div className='text-[#FF0000] text-xs'>{errors.lastname}</div>
                                ) : null}
                          </div>

                          <div className='grid grid-cols-5 items-center gap-2'>
                              <label className='col-start-1 col-span-2 text-xl font-semibold text-[#808080]' htmlFor="email">Email</label>
                              <Field className="col-start-3 col-span-3 border-2 bg-slate-100 rounded-full h-10 p-2 focus:outline-none  focus:border-gray-400" type="email" name="email" />
                              {errors.email && touched.email ? (
                                  <div className='text-[#FF0000] text-xs'>{errors.email}</div>
                                ) : null}
                          </div>

                          <div className='grid grid-cols-5 items-center gap-2'>
                              <label className='col-start-1 col-span-2 text-xl font-semibold text-[#808080]' htmlFor="about">Username</label>
                              <Field className="col-start-3 col-span-3 border-2 bg-slate-100 rounded-xl  p-2 focus:outline-none  focus:border-gray-400" type="text" name="username" />
                              {errors.username && touched.username ? (
                                  <div className='text-[#FF0000] text-xs'>{errors.username}</div>
                                ) : null}
                          </div>
                          
                          <div className='grid grid-cols-5 items-center gap-2'>
                              <label className='col-start-1 col-span-2 text-xl font-semibold text-[#808080]' htmlFor="password">Password</label>
                              <Field className="col-start-3 col-span-3 border-2 bg-slate-100 rounded-full h-10 p-2 focus:outline-none  focus:border-gray-400" type="password" name="password" />
                              {errors.password && touched.password ? (
                                  <div className='text-[#FF0000] text-xs'>{errors.password}</div>
                                ) : null}
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

export default Signup