import React, { useState, useEffect } from 'react';
import { Form } from '../../../../../util/interfaces';
import { API_URL } from '../../../../../util/api';
import { useFormik } from 'formik';
import { useRouter } from '../../../../../util/hooks';

export const SettingsGeneral = ({ formId }: { formId: string }) => {
  const { push } = useRouter();

  const [form, setForm] = useState<Form>();
  const [loading, setLoading] = useState(true);

  const { setValues, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      hiddenFields: '',
      mappedFields: '',
    },
    async onSubmit() {
      await fetch(`${API_URL}/form/${formId}`, {
        credentials: 'include',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (values.name !== form!.name) {
        push('/dashboard');
      }
    },
  });

  useEffect(() => {
    async function fetchForm() {
      const data = await fetch(`${API_URL}/form/${formId}`, { credentials: 'include' }).then(res => res.json());

      setLoading(false);
      setForm(data);
      setValues({ name: data.name, hiddenFields: data.hiddenFields, mappedFields: data.mappedFields });
    }

    fetchForm();
  }, []);

  return (
    <div className="mt-4">
      {loading && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}

      {!loading && (
        <div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
            <label className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">Name</label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="max-w-xs rounded-md shadow-sm">
                <input
                  className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>
            </div>

            <label className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
              Hidden fields <span className="text-blue-600">Read More</span>
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="max-w-lg rounded-md shadow-sm">
                <input
                  className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  name="hiddenFields"
                  onChange={handleChange}
                  value={values.hiddenFields}
                  placeholder="mjk4w, jnuw, a67yw, 9rghw"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Seperated by commas</p>
            </div>

            <label className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
              Mapped fields <span className="text-blue-600">Read More</span>
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="max-w-lg rounded-md shadow-sm">
                <input
                  className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  name="mappedFields"
                  onChange={handleChange}
                  value={values.mappedFields}
                  placeholder="mjk4w:name, jnuw:message"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Raw value and mapped value, seperated with a colon. Seperated by commas</p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-5">
            <div className="flex justify-end">
              <span className="ml-3 inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => handleSubmit()}
                  className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                >
                  Save
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
