function DivisionsDisplay({ divisions }) {
if (!divisions) {
    return null; // Or return a loading message, or handle the null case as needed
    }
  return (
    <div className="flex flex-col gap-4 justify-center mt-4">
      <table className="border-collapse border border-gray-300 mx-2">
        <thead>
          <tr>
            <th colSpan={divisions.green.length} className="bg-green-200 border border-gray-300 p-2">Green Division</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {divisions.green.map((college, index) => (
              <td key={index} className="border border-gray-300 p-2">{college}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <table className="border-collapse border border-gray-300 mx-2">
        <thead>
          <tr>
            <th colSpan={divisions.blue.length} className="bg-blue-200 border border-gray-300 p-2">Blue Division</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {divisions.blue.map((college, index) => (
              <td key={index} className="border border-gray-300 p-2">{college}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DivisionsDisplay;
