import React, { useRef } from "react";
import { useEffect, useState } from "react";

//单独处理0  null undefined会被 !value排除
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

//在一个函数里,改变传入的对象本身是不好的
//object在typescript里很广泛 function都是object 所以要写成这样才是键值对的object
export const clearnObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    //注意不能写成!value因为value为0也会被删掉,显然不能删,注意这是个坑
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(callback, []);
};

//useDebounce作用是防抖保存value更新后的值
//注意value需要是一个useState创建的state,这样他的改变才能触发重新渲染才能触发effect调用
export const useDebounce = <V>(value: V, delay?: number): V => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  const clear = () => {
    setValue([]);
  };
  const removeIndex = (index: number) => {
    let nArr = [...value];
    nArr.splice(index, 1);
    setValue(nArr);
  };
  const add = (item: T) => {
    setValue([...value, item]);
  };

  return {
    value,
    setValue,
    clear,
    removeIndex,
    add,
  };
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  //页面加载时: oldTitle = 旧title 'React App'
  //加载后: oldTitle = 新title

  // //闭包写法
  // const oldTitle = document.title;
  const oldTitle = React.useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    //页面被卸载的时候调用
    return () => {
      if (!keepOnUnmount) {
        //如果不指定依赖,读到的就是旧title`
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);

  // //闭包写法可读性不好,别人容易看不懂
  // useEffect(() => {
  //   //页面被卸载的时候调用
  //   return () => {
  //     if (!keepOnUnmount) {
  //       //如果不指定依赖,读到的就是旧title
  //       document.title = oldTitle;
  //     }
  //   };
  // }, []);
};

export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件的挂载状态,如果还没挂载或者已经卸载返回false,反之返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return mountedRef;
};
