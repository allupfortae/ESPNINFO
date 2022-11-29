export const removing = (values: any) => {
  let removingNull = {};
  removingNull[Symbol.iterator] = function () {
    return {
      next: {
        done: true,
        value: values,
        if(values) {
          removingNull = values.filter((e: any) => {
            return e;
          });
        },
      },
    };
  };
  return removingNull;
};
