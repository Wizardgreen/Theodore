import axios from "axios";

const baseRequest = axios.create({
  baseURL: "https://script.google.com/macros/s/",
});

enum Sheet {
  test = "AKfycbzFWdgPeex3jjuP3oQU7_6aZz_G6iEalRW9y6EuJoJgaoNq__W0jYRI",
}

enum Method {
  Get = "get",
  Post = "post",
}

type createApiArg = {
  sheetID: Sheet;
  method: Method;
  payload?: {};
};

const createAPI = ({
  sheetID,
  method,
  payload = undefined,
}: createApiArg) => async () => {
  switch (method) {
    case Method.Get:
      return await baseRequest[method](`${sheetID}/exec`);
    case Method.Post:
      return await baseRequest[method](`${sheetID}/exec`, payload);
  }
};

export const getSheet = createAPI({
  sheetID: Sheet.test,
  method: Method.Get,
});
