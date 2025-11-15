import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
import { getName } from "@/utils/formatters";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CatImg from "@/assets/Character_Cat_1.svg";
import type { ClassCourseType } from "@/types/ClassCourseType";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { PolarArea, Pie } from "react-chartjs-2";
import { Plus } from "lucide-react";

import { Chart as ChartJS, ArcElement, Tooltip, RadialLinearScale } from "chart.js";
ChartJS.register(ArcElement, Tooltip, RadialLinearScale);

type PaginationType = {
  page: number;
  limit: number;
};

const InitPagination: PaginationType = {
  page: 1,
  limit: 4,
};

const TeacherDashboard = () => {
  const [dataTeach, setDataTeach] = useState<TeacherDTO>();
  const [assignmentData, setAssignmentData] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [selectedMaLop, setSelectedMaLop] = useState<string>("");
  const [listClass, setListClass] = useState<ClassCourseType[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [pagination, setPagination] = useState<PaginationType>(InitPagination);
  const [totalPages, setTotalPages] = useState<number>(1);
  const MSGV = localStorage.getItem("username");

  const getOneTeacher = async () => {
    try {
      const res = await API.get(
        "/teacher/getOneTeacher/" + localStorage.getItem("username")
      );
      setDataTeach(res.data.data[0]);
    } catch (err: any) {
      toast.error(err?.response?.message);
    }
  };

  const getClassByTeacher = async () => {
    try {
      const res = await API.get(`/classCourse/getClassCourseByTeacher/${MSGV}`);
      setListClass(res.data.result.data);
      setSelectedMaLop(res.data.result.data[0].MaLop);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getStatisticalStatusAssignment = async () => {
    try {
      const res = await API.get(
        `/statistical/statusAssignment/${selectedMaLop}`
      );

      const labels = ["unsubmitted", "submitted", "lated"];

      const data = labels.map((item: any) => res.data.result.data[0][item]);

      setChartData({
        labels,
        datasets: [
          {
            label: "",
            data,
            fill: true,
            backgroundColor: [
              "rgba(0, 0, 0, 0.1)",
              "rgba(0, 0, 0, 0.2)",
              "rgba(0, 0, 0, 0.3)",
            ],
            borderColor: ["rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)"]
          },
        ],
      });
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };

  const getAllAssignment = async () => {
    try {
      const res = await API.get(
        `/assignments/getAllDueSoonByTeacher?filter=${selectedFilter}&page=${pagination.page}&limit=${pagination.limit}`
      );
      setAssignmentData(res.data.result.data);
      setTotalPages(res.data.result.totalPages);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleFilter = async (key: string) => {
    setSelectedFilter(key);
  };

  const FILTER_LIST = [
    {
      title: "All",
      onclick: () => handleFilter("All"),
    },
    {
      title: "Today",
      onclick: () => handleFilter("Today"),
    },
    {
      title: "Soon",
      onclick: () => handleFilter("Soon"),
    },
    {
      title: "Due",
      onclick: () => handleFilter("Due"),
    },
  ];

  const prevPage = () => {
    setPagination((prev) => {
      return { ...prev, page: prev.page - 1 };
    });
  };

  const nextPage = () => {
    setPagination((prev) => {
      return { ...prev, page: prev.page + 1 };
    });
  };

  const PageNunmberPagination = (page: number) => {
    setPagination((prev) => {
      return { ...prev, page };
    });
  };

  useEffect(() => {
    getClassByTeacher();
    getOneTeacher();
    getAllAssignment();
  }, [pagination, selectedFilter]);

  useEffect(() => {
    if (selectedMaLop) {
      getStatisticalStatusAssignment();
    }
  }, [selectedMaLop]);

  useEffect(() => {
    document.title = dataTeach?.hoten ?? "Dashboard";
  }, [dataTeach]);

  return (
    <div className="pt-5 ps-10 pe-5 w-full h-full">
      <div className="flex gap-15 h-full">
        <div className="w-[50%]">
          <div className="p-10 mt-5 bg-black/5 rounded-xl relative h-40">
            <h1 className="font-brand-logo text-5xl">
              Meow! {getName(dataTeach?.hoten ?? "")}
            </h1>
            <p>It's good to see you again.</p>
            <div className="absolute -top-5 right-10">
              <img width={170} src={CatImg} />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5 mt-5">
            {/* filter */}
            <div className="flex gap-2">
              {FILTER_LIST.map((f, i) => (
                <Button
                  key={i}
                  title={f.title}
                  variant={f.title === selectedFilter ? "primary" : "outline"}
                  onClick={f.onclick}
                />
              ))}
            </div>
            <div className="h-120 grid grid-rows-6 gap-3">
              {assignmentData.map((d) => (
                <div
                  key={d.MaBaiTap}
                  className={`p-5 rounded-xl flex justify-between items-center bg-black/5`}
                >
                  <div>
                    <h2 className="font-bold">{d.TieuDe}</h2>
                    <p>
                      {d.ten_lop} - {d.MaLop}
                    </p>
                  </div>
                  <Link
                    to={`/classcourse/${d.MaLop}/submissions/${d.MaBaiTap}`}
                    className="bg-black rounded-md text-white py-1 px-2"
                  >
                    <span>View detail</span>
                  </Link>
                </div>
              ))}
              <Pagination
                prevFunction={prevPage}
                nextFunction={nextPage}
                pageFunction={PageNunmberPagination}
                totalPages={totalPages}
                page={pagination.page}
                limit={pagination.limit}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3 mt-5 h-40">
            <div className="h-full bg-black/5 rounded-xl flex gap-2 justify-center items-center">
              <span className="text-7xl font-bold font-brand-title">11</span>
              <span>
                Unscored <br /> assignments
              </span>
            </div>
            <div className="bg-black/5 rounded-xl flex gap-2 justify-center items-center">
              <span className="text-7xl font-bold font-brand-title">4</span>
              <span>
                Week <br /> schedule
              </span>
            </div>
          </div>
          <div className="bg-black/5 py-3 px-5 rounded-xl">
            <div className="flex justify-end">
              <select
                className="p-2 outline-none bg-black/5 rounded-md"
                onChange={(e) => setSelectedMaLop(e.target.value)}
              >
                {listClass.map((c, i) => (
                  <option key={i} value={c.MaLop}>
                    {c.ten_lop}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-5 grid grid-cols-2 gap-2 justify-center">
              <div>
                {chartData && chartData.labels?.length > 0 ? (
                  <Pie
                    data={chartData}
                    options={{
                      responsive: true,
                      plugins: {
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              const sum = context.raw;
                              const label =
                                context.chart.data.labels?.[context.dataIndex];
                              return `${label}: ${sum}`;
                            },
                          },
                        },
                      },
                    }}
                  />
                ) : (
                  <p className="text-center text-gray-500">
                    Chưa có dữ liệu điểm
                  </p>
                )}
              </div>
              <div>
                {chartData && chartData.labels?.length > 0 ? (
                  <PolarArea
                    data={chartData}
                    options={{
                      responsive: true,
                      plugins: {
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              const sum = context.raw;
                              const label =
                                context.chart.data.labels?.[context.dataIndex];
                              return `${label}: ${sum}`;
                            },
                          },
                        },
                      },
                    }}
                  />
                ) : (
                  <p className="text-center text-gray-500">
                    Chưa có dữ liệu điểm
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-black rounded-xl p-5">
            <Button
              title="Assignment"
              className="bg-white/10 text-white hover:bg-white/20"
              icon={<Plus size={15} />}
            ></Button>
            <Button
              title="Quiz"
              className="bg-white/10 text-white hover:bg-white/20"
              icon={<Plus size={15} />}
            ></Button>
            <Button
              title="Content"
              className="bg-white/10 text-white hover:bg-white/20"
              icon={<Plus size={15} />}
            ></Button>
            <Button
              title="Notification"
              className="bg-white/10 text-white hover:bg-white/20"
              icon={<Plus size={15} />}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
