// components/Table.js

import React from 'react';

function TableXML({ xmlData }) {
    const headers = xmlData.length > 0 ? Object.keys(xmlData[0]) : [];

    return (
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {xmlData.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>)
}

export  { TableXML };
