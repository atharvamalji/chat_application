const HeaderLocationReducer = (state, action) => {
    switch (action.type) {
        case "PAGE_FEED":
            return {
                location: "feed"
            };
        case "PAGE_FRIENDS":
            return {
                location: "friends"
            };
        case "PAGE_MESSAGES":
            return {
                location: "messages"
            };
        case "PAGE_SETTINGS":
            return {
                location: "settings"
            };
    }
}

export default HeaderLocationReducer;