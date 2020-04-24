import React, { useState } from 'react';
import { SettingsAppearance } from './SettingsAppearance/SettingsAppearance';

import classNames from 'classnames';

export const MainSettings = ({ formId }: { formId: string }) => {
  const [selected, setSelected] = useState('General');

  const SELECTED_STYLE =
    'cursor-pointer mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150';
  const UNSELECTED_STYLE =
    'cursor-pointer mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150';

  const SELECTED_ICON_STYLE =
    'flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150';
  const UNSELECTED_ICON_STYLE =
    '"flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150';

  return (
    <div className="flex flex-col sm:flex-row">
      <nav className="w-full sm:w-1/4 -mt-7 sm:-mt-3">
        <a onClick={() => setSelected('General')} className={selected == 'General' ? SELECTED_STYLE : UNSELECTED_STYLE}>
          <svg className={selected == 'General' ? SELECTED_ICON_STYLE : UNSELECTED_ICON_STYLE} stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
            />
          </svg>
          <span className="truncate">General</span>
        </a>
        <a onClick={() => setSelected('Appearance')} className={selected == 'Appearance' ? SELECTED_STYLE : UNSELECTED_STYLE}>
          <svg className={selected == 'Appearance' ? SELECTED_ICON_STYLE : UNSELECTED_ICON_STYLE} stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              strokeWidth="2"
            ></path>
          </svg>
          <span className="truncate">Appearance</span>
        </a>
      </nav>
      <div className="sm:ml-5 sm:w-3/4">{selected == 'Appearance' && <SettingsAppearance formId={formId} />}</div>
    </div>
  );
};