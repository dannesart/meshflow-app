export const DroppableMock = {
    list: [
        {
            id: "a-random-id",
            status: 0
        },
        {
            id: "a-random-id-2",
            status: 1
        }
    ],
    status: 0
}

export const DroppedItemId = DroppableMock.list[1].id;

export const DropEventMock = {
    dataTransfer: {
        getData: (query: string) => {
            return DroppedItemId;
        }
    }
}