import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchForm } from "@/components/ui/search-form";
import type { MessageType, InboxType } from "@/types/Inbox";
import API from "@/utils/axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const InboxMain = () => {
  const [listInbox, setListInbox] = useState<InboxType[]>([]);
  const [selectedInbox, setSelectedInbox] = useState<InboxType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("username");

  const getAllInboxByTeacher = async () => {
    try {
      const res = await API.get("/inbox/getAllInboxByTeacher");
      setListInbox(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getAllInboxByStudent = async () => {
    try {
      const res = await API.get("/inbox/getAllInboxByStudent");
      setListInbox(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getAllMessageByTeacher = async () => {
    try {
      const res = await API.get(
        `/inbox/getAllMessageByTeacher/${selectedInbox?.MaThread}`
      );
      setMessages(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getAllMessageByStudent = async () => {
    try {
      const res = await API.get(
        `/inbox/getAllMessageByStudent/${selectedInbox?.MaThread}`
      );
      setMessages(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedInbox) {
      return;
    }

    const body = {
      MaLop: selectedInbox?.MaLop,
      NoiDung: newMessage.trim(),
    };
    try {
      await API.post("inbox/sendMessage", body);

      setNewMessage("");

      if (role === "GV") {
        getAllMessageByTeacher();
      } else {
        getAllMessageByStudent();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (role === "GV") {
      getAllInboxByTeacher();
    } else {
      getAllInboxByStudent();
    }
  }, []);

  useEffect(() => {
    if (role === "GV") {
      getAllMessageByTeacher();
    } else {
      getAllMessageByStudent();
    }
  }, [selectedInbox]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = () => {};

  return (
    <div className="pt-5 ps-10 pe-5 w-full flex gap-2 flex-1">
      {/* Sidebar: danh sách lớp */}
      <div className="w-1/4 bg-yellow-brand rounded-xl p-2 overflow-y-auto">
        <div className="w-full py-4 text-black">
          <Input placeholder="Search" variant="borderBottom" />
        </div>
        <div className="flex flex-col gap-2">
          {listInbox.map((inbox) => (
            <div
              key={inbox.MaLop}
              className={`p-2 rounded-md cursor-pointer text-black ${
                selectedInbox?.MaLop === inbox.MaLop ? "bg-black text-white" : "bg-black/5"
              }`}
              onClick={() => setSelectedInbox(inbox)}
            >
              {inbox.ten_lop}
            </div>
          ))}
        </div>
      </div>

      {/* Khung chat */}
      <div
        className="flex-1 bg-black/5 rounded-xl overflow-hidden"
        
      >
        {selectedInbox ? (
          <div className="h-full flex flex-col relative">
            <div className="px-3 py-4.5 w-full border-b border-gray-300">
              <h1 className="text-xl font-bold uppercase">{selectedInbox.TieuDe}</h1>
            </div>
            {/* Tin nhắn */}
            <div className="overflow-y-auto p-3 flex-1" ref={chatEndRef}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.MaNguoiGui === id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl max-w-[70%] mt-2 animate-slideInBottom ${
                      msg.MaNguoiGui === id
                        ? "bg-black text-white"
                        : "bg-black/50 text-white"
                    }`}
                  >
                    <p className="text-sm mb-1">
                      <b>
                        {msg.VaiTro === "GV" ? "T." : "S."} {msg.hoten}
                      </b>
                    </p>
                    <p>{msg.NoiDung}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {new Date(msg.ThoiGianGui).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input gửi tin */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-gray-300 flex gap-2 absolute bottom-0 right-0 left-0"
            >
              <Input
                placeholder="Enter message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button variant="primary" title="Send" type="submit"></Button>
            </form>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Chọn một lớp để xem tin nhắn
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxMain;
