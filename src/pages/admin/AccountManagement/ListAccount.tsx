import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown";
import { FilterForm } from "@/components/ui/filter-form";
import { Pagination } from "@/components/ui/pagination";
import { SearchForm } from "@/components/ui/search-form";
import type { AccountType } from "@/types/AccountType";
import type { MenuItem } from "@/types/MenuItemType";
import API from "@/utils/axios";
import {
  Ellipsis,
  Lock,
  LockOpen,
  RotateCcwKey,
} from "lucide-react";
import { useEffect, useState } from "react";

const headerTableAccount = [
  "STT",
  "Username",
  "Họ Tên",
  "Vai trò",
  "Trạng thái",
  "Tác vụ",
];

const data_mock = [
  {
    label: "Trạng thái",
    key: "status",
    select: [
      {
        name: "All",
        value: "",
      },
      {
        name: "Active",
        value: "active",
      },
      {
        name: "Block",
        value: "block",
      },
    ],
  },
  {
    label: "Vai trò",
    key: "role",
    select: [
      {
        name: "All",
        value: "",
      },
      {
        name: "Giảng viên",
        value: "GV",
      },
      {
        name: "Sinh viên",
        value: "SV",
      },
    ],
  },
  {
    label: "Sắp xếp theo",
    key: "order",
    select: [
      {
        name: "a-z",
        value: "asc",
      },
      {
        name: "z-a",
        value: "desc",
      },
    ],
  },
];

type FilterType = {
  key: string;
  value: string;
};

type Params = {
  page: number;
  limit: number;
  keyword: string;
  filter: FilterType[];
};

const InitParams: Params = {
  page: 1,
  limit: 10,
  keyword: "",
  filter: [],
};

const ListAccount = () => {
  const [dataAccount, setDataAccount] = useState<AccountType[]>([]);
  const [paramsData, setParamsData] = useState<Params>(InitParams);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getAllAccount = async () => {
    try {
      const filter = paramsData.filter
        .map((f) => `${f.key}=${f.value}`)
        .join("&");
      const params = `keyword=${paramsData.keyword}&${filter}&limit=${paramsData.limit}&page=${paramsData.page}`;
      const res = await API.get(`/account/get/all?${params}`);
      setDataAccount(res.data.result.data);
      setTotalPages(res.data.result.totalPages);
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  const prevPage = () => {
    setParamsData((prev) => {
      return { ...prev, page: prev.page - 1 };
    });
  };

  const nextPage = () => {
    setParamsData((prev) => {
      return { ...prev, page: prev.page + 1 };
    });
  };

  const PageNunmberPagination = (page: number) => {
    setParamsData((prev) => {
      return { ...prev, page };
    });
  };

  const handleSearch = async (keyword: string) => {
    console.log("keyword:", keyword);
    setParamsData({ ...paramsData, keyword });
  };

  const handleFilter = (value: string, keySelect: string) => {
    console.log("filter:", value);
    console.log("key:", keySelect);

    setParamsData((prev) => {
      const newFilters = prev.filter.filter((f) => f.key !== keySelect);
      return {
        ...prev,
        filter: [...newFilters, { value, key: keySelect }],
      };
    });
  };

  const getItemsAction = (username: string, status: string) => {
    console.log(username)
    const items: MenuItem[] = [
      {
        label: status === "active" ? "Lock account" : "Unlock account",
        icon: status === "active" ? <Lock /> : <LockOpen />,
      },
      {
        label: "Reset password",
        icon: <RotateCcwKey />,
      },
    ];

    return items;
  };

  useEffect(() => {
    getAllAccount();
  }, [paramsData]);

  return (
    <div className="py-5 px-10 w-full h-full dark:bg-card">
      <div className="w-full px-2">
        <h2 className="text-2xl uppercase">Quản lý tài khoản</h2>
      </div>
      <div className="p-3 ring ring-gray-100 max-h-[550px] dark:ring-gray-700  rounded-md mt-5">
        <div className="flex justify-between items-center gap-2 my-5">
          <div className="flex gap-2">
            <SearchForm handleSearch={handleSearch} />
            <FilterForm data={data_mock} handleFilter={handleFilter} />
          </div>
        </div>
        <div className="w-full h-[350px] overflow-y-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left border-b border-gray-500">
                {headerTableAccount.map((h, i) => (
                  <th key={i} className="py-2">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataAccount?.map((a: any, i) => (
                <tr
                  key={a.username}
                  className="border-b border-gray-500 text-left"
                >
                  {/* 2  */}
                  <td className="py-3">{i + 1}</td>
                  <td>{a.username}</td>
                  <td>{a.fullname}</td>
                  <td>{a.role}</td>
                  <td>
                    <span
                      className={`w-20 text-center block px-2 rounded-xl ${
                        a.status === "active"
                          ? "bg-green-100 ring ring-green-500 text-green-700"
                          : "bg-rose-100 ring ring-rose-500 text-rose-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <DropdownMenu
                        items={getItemsAction(a.username, a.status)}
                        size="sm"
                        side="left"
                        align="start"
                        trigger={
                          <Button
                            variant="icon"
                            size="ic"
                            icon={<Ellipsis size={18} />}
                          />
                        }
                      ></DropdownMenu>

                      {/* <AlertDialogDemo
                        trigger={
                          <Button
                            variant="icon"
                            size="ic"
                            icon={<Trash2 size={18} color="red" />}
                          />
                        }
                        label="Bạn có muốn xoá không ?"
                        description="Lưu ý: hành động này sẽ không thể hoàn tác."
                      /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          prevFunction={prevPage}
          nextFunction={nextPage}
          pageFunction={PageNunmberPagination}
          page={paramsData.page}
          totalPages={totalPages}
          limit={paramsData.limit}
        />
      </div>
    </div>
  );
};

export default ListAccount;
