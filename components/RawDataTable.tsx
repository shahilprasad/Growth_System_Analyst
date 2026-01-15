import React from 'react';
import { ClinicianLog } from '../types';

interface Props {
  data: ClinicianLog[];
}

export const RawDataTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Note (Words)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template %</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inactive Days</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.user_id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.user_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.specialty}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.session_count}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.avg_note_length}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(row.template_usage_rate * 100).toFixed(0)}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.last_active_days > 3 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {row.last_active_days} days
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};