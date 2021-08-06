import { useEffect, useRef } from 'react';
import SearchPOI from '@/components/pagePredict/poi-selector';
import { usePoi } from '@/project/Predict/function/usePoi';

/**
 * poi 查询
 * @param {object} bmap - 地图实例
 * @param {object} traj - 单条轨迹数据
 */
export const usePoiSearch = (bmap, traj) => {
  const instance = useRef(null);
  const { poiDisabled, setPoiDisabled, poiState, poiDispatch } = usePoi();

  // 实例化 SearchPOI 类
  useEffect(() => {
    if (!bmap) return () => { };
    instance.current = new SearchPOI(bmap);
  }, [bmap])

  // 单条轨迹 + POI 查询
  useEffect(() => {
    // 只有单条轨迹时才触发
    if (traj) {
      let res = traj ? traj.data : undefined;
      // 是否启用 POI 查询
      if (poiDisabled) {
        try {
          let center;
          switch (poiState.description) {
            case 'start':
              center = res[0];
              break;
            case 'current':
              center = res[0];
              break;
            case 'end':
              center = res.slice(-1)[0];
              break;
            default:
              throw new Error('没有对应的类型')
          }
          instance.current?.addAndSearchInCircle({
            keyword: poiState.keyword,
            center,
            radius: poiState.radius,
          })
        } catch (err) {
          console.log(err);
        }
      }
    }
    return () => {
      instance.current?.removeOverlay();
    }
  }, [traj, poiDisabled, poiState])

  return {
    poiDisabled, 
    setPoiDisabled, 
    poiState, 
    poiDispatch,
  }
}