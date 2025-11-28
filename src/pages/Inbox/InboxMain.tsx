import AvatarDemo from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import type { MessageType, InboxType } from "@/types/Inbox";
import API from "@/utils/axios";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const InboxMain = () => {
  const [listInbox, setListInbox] = useState<InboxType[]>([]);
  const [selectedInbox, setSelectedInbox] = useState<InboxType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const {user} = useAuth()

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

      if (user?.role === "GV") {
        getAllMessageByTeacher();
      } else {
        getAllMessageByStudent();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!user) return

    if (user?.role === "GV") {
      getAllInboxByTeacher()
    } else {
      getAllInboxByStudent();
    }
  }, [user]);

  useEffect(() => {

    if (user?.role === "GV") {
      getAllMessageByTeacher();
    } else {
      getAllMessageByStudent();
    }
  }, [selectedInbox]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="pt-5 ps-10 pe-5 w-full flex gap-2 flex-1">
      
      <div className="w-full flex gap-2 py-5 rounded-xl">
        {/* Sidebar: danh sách lớp */}
        <div className="w-1/5 ring ring-gray-100 rounded-xl p-2 overflow-y-auto shadow-md">
          <div className="w-full py-4">
            <Input placeholder="Search" variant="borderBottom" />
          </div>
          <div className="flex flex-col gap-2">
            {listInbox.map((inbox) => (
              <div
                key={inbox.MaLop}
                className={`p-2 cursor-pointer rounded-md ${
                  selectedInbox?.MaLop === inbox.MaLop ? "bg-black text-white" : ""
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
          className="flex-1 ring ring-gray-100 shadow-md rounded-xl overflow-hidden"
        
        >
          {selectedInbox ? (
            <div className="h-full flex flex-col relative">
              <div className="px-3 py-4.5 w-full border-b border-gray-300">
                <h1 className="text-xl text-center font-bold uppercase">{selectedInbox.TieuDe}</h1>
              </div>
              {/* Tin nhắn */}
              <div className="p-3 h-125 overflow-y-scroll flex flex-col gap-2">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 ${
                        msg.MaNguoiGui === user?.username ? "flex-row-reverse" : "justify-start"
                      }`}
                    >
                      <AvatarDemo img={msg.avatar}/>
                      <div
                        className={`p-2 rounded-xl max-w-[70%] animate-slideInBottom ${
                          msg.MaNguoiGui === user?.username
                            ? "bg-black text-white"
                            : "bg-black/50 text-white"
                        }`}
                      >
                        {/* <p className="text-sm mb-1">
                          <b>
                            {msg.VaiTro === "GV" ? "T." : "S."} {msg.hoten}
                          </b>
                        </p> */}
                        <p>{msg.NoiDung}</p>
                        {/* <p className="text-xs opacity-60 mt-1">
                          {new Date(msg.ThoiGianGui).toLocaleString()}
                        </p> */}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
              </div>
              {/* Input gửi tin */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 border-t border-gray-300 flex gap-2 sticky bottom-0 right-0 left-0"
              >
                <Input
                  placeholder="Enter message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button variant="primary" title="Send" type="submit" icon={<Send size={18}/>}></Button>
              </form>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Chọn một lớp để xem tin nhắn
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxMain;
