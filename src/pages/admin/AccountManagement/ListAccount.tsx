import type { AccountType } from "@/types/AccountType";
import API from "@/utils/axios";
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
      const res = await API.get(`/account/get/all?${params}`)
      setDataAccount(res.data.result.data)
      setTotalPages(res.data.result.totalPages)
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

  useEffect(() => {
    getAllAccount()
  }, [paramsData])

  return <div></div>;
};

export default ListAccount;
