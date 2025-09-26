type TableProps = {
  header: string[]
  data: any
};

export const Table = ({header,data}: TableProps) => {
  return (
    <div className="w-full">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-left border-b">
            {header.map(h => (
                <th className="py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((t:any) => (
            <tr className="border-b">
              <td className="py-2">{t.MSGV}</td>
              <td>{t.hoten}</td>
              <td>{t.ngaysinh}</td>
              <td>{t.sdt}</td>
              <td>{t.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
