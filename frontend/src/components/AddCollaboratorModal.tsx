import React, { useRef } from 'react';
import { User } from '../util/interfaces';

import classNames from 'classnames';
import { useFormik } from 'formik';
import { useOutsideClick } from '../util/hooks';

import * as yup from 'yup';
import { API_URL } from '../util/api';
import { useToasts } from 'react-toast-notifications';
import { Transition } from './Transition';

interface Props {
  onClose: () => void;
  onAdd: (user: User) => void;
  formId: string;
  open: boolean;
}

export const AddCollaboratorModal = ({ onClose, onAdd, formId, open }: Props) => {
  const { addToast } = useToasts();

  const modalRef = useRef();
  useOutsideClick(modalRef, () => onClose());

  const { values, handleChange, errors, handleSubmit } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email cannot be empty').email('Email must be a valid email'),
    }),
    async onSubmit(values) {
      const res = await fetch(`${API_URL}/collaborator/${formId}`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        method: 'POST',
        credentials: 'include',
      });

      if (res.status == 400) return addToast('This user is already a collaborator', { appearance: 'error', autoDismiss: true });
      if (res.status == 404) return addToast('No user could be found with this email', { appearance: 'error', autoDismiss: true });

      addToast('User successfully added', { appearance: 'success', autoDismiss: true });

      return onAdd(await res.json());
    },
    validateOnChange: false,
  });

  return (
    <Transition show={open}>
      <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
        <Transition
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
        </Transition>

        <Transition
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full overflow-hidden" ref={modalRef as any}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-blue-600"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add new collaborator</h3>

                  <div className="mt-2 flex flex-row w-full">
                    <div className="w-full">
                      <div className="mt-1 relative rounded-md shadow-sm flex flex-col">
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            className={classNames('form-input block w-full sm:text-sm sm:leading-5', { 'shadow-outline-red border-red-300': errors.email })}
                            placeholder="Collaborator's email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                          />
                        </div>
                        <p className="text-red-500 transition text-sm pt-0.5">{errors.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Add
                </button>
              </span>
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Cancel
                </button>
              </span>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  );
};
