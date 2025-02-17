import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { chatBot } from "../../../Redux Toolkit/Customer/AiChatBotSlice";
import { Box, Button, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PromptMessage from "./PromptMessage";
import ResponseMessage from "./ResponseMessage";
import CloseIcon from '@mui/icons-material/Close';

const ChatBot = ({ handleClose, productId }) => {
    const dispatch = useAppDispatch();
    const [prompt, setPrompt] = useState();
    const chatContainerRef = useRef(null);
    const { aiChatBot } = useAppSelector(store => store);
    
    const handleGivePrompt = (e) => {
        e.stopPropagation();
        dispatch(chatBot({ prompt: { prompt }, productId, userId: null }));
    };

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [aiChatBot.messages]);

    return (
        <div className="rounded-lg">
            <div className="w-full lg:w-[40vw] h-[82vh] shadow-2xl bg-white z-50 rounded-lg">
                <div className=" h-[12%] flex justify-between items-center px-5 bg-slate-100 rounded-t-lg">
                    <div className="flex items-center gap-3 ">
                        <h1 className="logo text-[#303f9f]">ShopNexGen</h1>
                        <p>Assitant</p>
                    </div>
                    <div>
                        <IconButton onClick={handleClose} color="primary">
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>

                <div className="h-[78%] p-5 flex flex-col py-5 px-5 overflow-y-auto  custom-scrollbar">
                    <p>welcome to ShopNexGen Ai Assistant, you can
                        {productId ? ` Query About this Product : ${productId}` : "   Query about your cart, and order history here"}
                    </p>
                    {aiChatBot.messages.map((item, index) =>
                        item.role === "user" ? (
                            <div ref={chatContainerRef} className="self-end" key={index}>
                                <PromptMessage message={item.message} index={index} />
                            </div>
                        ) : (
                            <div ref={chatContainerRef} className="self-start" key={index}>
                                <ResponseMessage message={item.message} />
                            </div>
                        )
                    )}
                    {aiChatBot.loading && <p>fetching data...</p>}
                </div>

                <div className=" h-[10%] flex items-center">
                    <input
                        onChange={handlePromptChange}
                        type="text"
                        placeholder="give your prompt"
                        className="rounded-bl-lg pl-5 h-full w-full bg-slate-100 border-none outline-none"
                    />
                    <Button
                        sx={{ borderRadius: "0 0 0.5rem 0" }}
                        className="h-full"
                        onClick={handleGivePrompt}
                        variant="contained"
                    >
                        <SendIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
