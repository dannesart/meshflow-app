import { ModelDbModel } from "~~/models/model.db";

export default defineEventHandler(async (e) => {
  // const session = await getServerSession(e);
  // if (!session || !session.user) {
  //   return { error: "Need to be authenticated" };
  // }
  const { projectId } = getQuery(e);
  const data = await ModelDbModel.find({
    projectId: projectId,
    serviceType: "data",
  });

  return (
    data.map((_data) => {
      return {
        ..._data.toJSON(),
        id: _data._id,
      };
    }) || []
  );
});
