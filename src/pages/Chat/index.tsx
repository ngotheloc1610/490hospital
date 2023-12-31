import { useEffect, useRef, useState } from "react";
import axios from "axios";
import moment from "moment";
// import SockJS from "sockjs-client";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';

import { USER } from "../../assets";
import PopUpCreateRoom from "./PopUpCreateRoom";
import { FORMAT_DATE, FORMAT_DATE_TIME_2, FORMAT_TIME } from "../../Contants/general.constant";
import { error } from "../../components/Common/notify";
import { defineConfigGet, defineConfigPost } from "../../components/Common/utils";
import { API_GET_MESSAGE_BY_ROOM, API_INBOX_ROOM_LIST } from "../../Contants/api.constant";

const Chat = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const [listRoom, setListRoom] = useState([])
    const [messageRoom, setMessageRoom] = useState([]);
    const [message, setMessage] = useState<string>("");
    const [nameRoom, setNameRoom] = useState<string>("");
    const [idRoom, setIdRoom] = useState<string>("");
    const [isShowPopUp, setIsShowPopUp] = useState<boolean>(false);
    const [selectFile, setSelectFile] = useState<any>(null)
    const [selectFileImage, setSelectFileImage] = useState<any>(null)

    const fileInputRef = useRef<any>(null);
    const fileImageInputRef = useRef<any>(null);
    const messageRef = useRef<any>(null)

    useEffect(() => {
        messageRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    useEffect(() => {
        getListInboxRoom()
    }, [])

    const getListInboxRoom = () => {
        const url = `${url_api}${API_INBOX_ROOM_LIST}`;

        const params = {
            patientId: "",
            organizationId: null
        }

        axios
            .post(url, params, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    setListRoom(resp.data.inboxRooms);
                }
            })
            .catch((err) => {
                console.log("error get rooms:", err);
            });
    }

    const getMessageByRoom = (roomId: string) => {
        const url = `${url_api}${API_GET_MESSAGE_BY_ROOM}${roomId}/message`;

        axios
            .get(url, defineConfigGet({ page: 0, size: 100 }))
            .then((resp: any) => {
                if (resp) {
                    setMessageRoom(resp.data.content);
                }
            })
            .catch((err) => {
                console.log("error get message by room:", err);
            });
    }

    // const callSendMessage = () => {
    //     const url = `${url_api}${API_INBOX_MESSAGE_SEND}`;

    //     const params = {
    //         userSenderId: "",
    //         roomId: "",
    //         message: message,
    //         media: {
    //             file: "",
    //             fileName: "",
    //             type: "",
    //             url: ""
    //         }
    //     }

    //     axios
    //         .post(url, params, defineConfigPost())
    //         .then((resp: any) => {
    //             if (resp) {
    //                 console.log("resp:", resp)
    //             }
    //         })
    //         .catch((err) => {
    //             error(err.response.data.errors.message)
    //             console.log("error send message:", err);
    //         });
    // }

    const handleGetMessageByRoom = (roomId: string) => {
        getMessageByRoom(roomId);
    }

    const sendMessage = () => {
        // callSendMessage()
    }

    const handleSearchRoom = () => {

    }


    const handleClickFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setSelectFile(file);
    };

    const handleClickFileImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileImageChange = (event: any) => {
        const file = event.target.files[0];
        setSelectFileImage(file)
    };

    return (
        <section className="chat">
            <div className="chat-container">
                <div className='chat-room'>
                    <div className='chat-room-header'>
                        <div className='d-flex justify-content-between mb-3'>
                            <h3>Message</h3>
                            <span onClick={() => setIsShowPopUp(true)}>
                                <AddCommentOutlinedIcon />
                            </span>
                        </div>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search by patient name" value={nameRoom} onChange={(e: any) => setNameRoom(e.target.value)} />
                            <span className="input-group-text cursor-pointer" onClick={() => handleSearchRoom()}><i className="bi bi-search" ></i></span>
                        </div>
                    </div>
                    <div className='chat-room-content'>
                        {listRoom && listRoom.map((item: any) => {
                            return (
                                <div className="chat-room-content-item d-flex justify-content-between" onClick={() => { handleGetMessageByRoom(item?.id); setIdRoom(item?.id) }}>
                                    <div>
                                        <img src={USER} alt="" />
                                    </div>
                                    <div>
                                        <p>{item?.patient?.mail}</p>
                                        <p>{item?.lastMessage?.message}</p>
                                    </div>
                                    <div>
                                        <p>{moment(item?.lastMessage?.updateAt).format(FORMAT_DATE)}</p>
                                        <p>{moment(item?.lastMessage?.updateAt).format(FORMAT_TIME)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='chat-message'>
                    {idRoom ? <>
                        {listRoom && listRoom.filter((item: any) => { return item.id === idRoom }).map((item: any) => {
                            return (
                                <div className="d-flex chat-message-header">
                                    <div>
                                        <img src={USER} alt="" />
                                        <span className="fw-bold ms-3">{item?.patient?.mail}</span>
                                    </div>

                                    <span className="my-auto cursor-pointer">
                                        <InfoOutlinedIcon />
                                    </span>
                                </div>
                            )
                        })}

                        <div className="chat-message-content">
                            {messageRoom && messageRoom.map((item: any) => {
                                return (
                                    <div className="chat-message-content-msg">
                                        <span className='text-message mb-1'>{item?.message}</span>
                                        <span>{moment(item?.createdAt).format(FORMAT_DATE_TIME_2)}</span>
                                        <div ref={messageRef}></div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="chat-message-footer">
                            <span className="m-auto cursor-pointer" >
                                <SentimentSatisfiedAltIcon />
                            </span>
                            <div className="message-input">
                                <input type="text" className="form-control" placeholder="Write a message..." value={message} onChange={(e: any) => setMessage(e.target.value)} />
                            </div>
                            <div className="m-auto " >
                                <span className="me-1 cursor-pointer" onClick={handleClickFile}>
                                    <AttachFileIcon />
                                </span>
                                <input type="file" className="d-none" ref={fileInputRef} onChange={handleFileChange} />

                                <span className="me-1 cursor-pointer" onClick={handleClickFileImage}><AddPhotoAlternateIcon /></span>
                                <input type="file" className="d-none" ref={fileImageInputRef} onChange={handleFileImageChange} />

                                <span className="send-message cursor-pointer" onClick={() => sendMessage()}>
                                    <SendIcon />
                                </span>
                            </div>
                        </div>
                    </> : <>
                        <div className="">
                            <span className="">Select a chat to start message</span>
                        </div>
                    </>}
                </div>
            </div>

            {isShowPopUp && <PopUpCreateRoom handleShowPopUp={setIsShowPopUp} />}
        </section>
    )
}

export default Chat