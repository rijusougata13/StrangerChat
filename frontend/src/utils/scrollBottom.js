export const shouldScrollToBottom=()=>{
    //If user is near the bottom of the chat, automatically navigate them to bottom when new chat message/notification appears
		if (messageEndRef.current.scrollHeight - messageEndRef.current.scrollTop < messageEndRef.current.offsetHeight + autoScrollOffset){
			scrollToBottom()
		}

		//Navigate to end of chat when entering chat the first time
		if(initialLoad){
			scrollToBottom()
      setInitialLoad(false);
		}
	}

export	const scrollToBottom=()=>{
		//Scrolls user to end of chat message window
    setTimeout(()=>{
		messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    },100);
}