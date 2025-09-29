const ox = 500
const oy = 500
const x0 = 350
const y0 = 300
const global_params = {
  weights_variation_power: glyph.getParam('字重变化'),
  start_style_type: glyph.getParam('起笔风格'),
  start_style_value: glyph.getParam('起笔数值'),
  turn_style_type: glyph.getParam('转角风格'),
  turn_style_value: glyph.getParam('转角数值'),
  bending_degree: glyph.getParam('弯曲程度'),
  weight: glyph.getParam('字重') || 40,
}
const params = {
  heng_length: glyph.getParam('横-长度'),
  zhe_horizontalSpan: glyph.getParam('折-水平延伸'),
  zhe_verticalSpan: glyph.getParam('折-竖直延伸'),
  zhe_bendCursor: glyph.getParam('折-弯曲游标'),
  zhe_bendDegree: glyph.getParam('折-弯曲度') + 30 * global_params.bending_degree,
  wan_length: glyph.getParam('弯-长度'),
  gou_horizontalSpan: glyph.getParam('钩-水平延伸'),
  gou_verticalSpan: glyph.getParam('钩-竖直延伸'),
}

const refline = (p1, p2, type) => {
  const refline =  {
    name: `${p1.name}-${p2.name}`,
    start: p1.name,
    end: p2.name,
  }
  if (type) {
    refline.type = type
  }
  return refline
}

const distance = (p1, p2) => {
  return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y))
}

const getJointsMap = (data) => {
  const { draggingJoint, deltaX, deltaY } = data
  const jointsMap = Object.assign({}, glyph.tempData)
  switch (draggingJoint.name) {
    case 'heng_end': {
      jointsMap['heng_end'] = {
        x: glyph.tempData['heng_end'].x + deltaX,
        y: glyph.tempData['heng_end'].y,
      }
      jointsMap['zhe_start'] = {
        x: glyph.tempData['zhe_start'].x + deltaX,
        y: glyph.tempData['zhe_start'].y,
      }
      jointsMap['zhe_bend'] = {
        x: glyph.tempData['zhe_bend'].x + deltaX,
        y: glyph.tempData['zhe_bend'].y,
      }
      jointsMap['zhe_end'] = {
        x: glyph.tempData['zhe_end'].x + deltaX,
        y: glyph.tempData['zhe_end'].y,
      }
      jointsMap['wan_start'] = {
        x: glyph.tempData['wan_start'].x + deltaX,
        y: glyph.tempData['wan_start'].y,
      }
      jointsMap['wan_end'] = {
        x: glyph.tempData['wan_end'].x + deltaX,
        y: glyph.tempData['wan_end'].y,
      }
      jointsMap['gou_start'] = {
        x: glyph.tempData['gou_start'].x + deltaX,
        y: glyph.tempData['gou_start'].y,
      }
      jointsMap['gou_end'] = {
        x: glyph.tempData['gou_end'].x + deltaX,
        y: glyph.tempData['gou_end'].y,
      }
      break
    }
    case 'zhe_start': {
      jointsMap['heng_end'] = {
        x: glyph.tempData['heng_end'].x + deltaX,
        y: glyph.tempData['heng_end'].y,
      }
      jointsMap['zhe_start'] = {
        x: glyph.tempData['zhe_start'].x + deltaX,
        y: glyph.tempData['zhe_start'].y,
      }
      jointsMap['zhe_bend'] = {
        x: glyph.tempData['zhe_bend'].x + deltaX,
        y: glyph.tempData['zhe_bend'].y,
      }
      jointsMap['zhe_end'] = {
        x: glyph.tempData['zhe_end'].x + deltaX,
        y: glyph.tempData['zhe_end'].y,
      }
      jointsMap['wan_start'] = {
        x: glyph.tempData['wan_start'].x + deltaX,
        y: glyph.tempData['wan_start'].y,
      }
      jointsMap['wan_end'] = {
        x: glyph.tempData['wan_end'].x + deltaX,
        y: glyph.tempData['wan_end'].y,
      }
      jointsMap['gou_start'] = {
        x: glyph.tempData['gou_start'].x + deltaX,
        y: glyph.tempData['gou_start'].y,
      }
      jointsMap['gou_end'] = {
        x: glyph.tempData['gou_end'].x + deltaX,
        y: glyph.tempData['gou_end'].y,
      }
      break
    }
    case 'zhe_bend': {
      jointsMap['zhe_bend'] = {
        x: glyph.tempData['zhe_bend'].x + deltaX,
        y: glyph.tempData['zhe_bend'].y + deltaY,
      }
      break
    }
    case 'zhe_end': {
      jointsMap['zhe_end'] = {
        x: glyph.tempData['zhe_end'].x + deltaX,
        y: glyph.tempData['zhe_end'].y + deltaY,
      }
      const newBend = getBend(jointsMap['zhe_start'], jointsMap['zhe_end'])
      jointsMap['zhe_bend'] = {
        x: newBend.x,
        y: newBend.y,
      }
      jointsMap['wan_start'] = {
        x: glyph.tempData['wan_start'].x + deltaX,
        y: glyph.tempData['wan_start'].y  + deltaY,
      }
      jointsMap['wan_end'] = {
        x: glyph.tempData['wan_end'].x + deltaX,
        y: glyph.tempData['wan_end'].y + deltaY,
      }
      jointsMap['gou_start'] = {
        x: glyph.tempData['gou_start'].x + deltaX,
        y: glyph.tempData['gou_start'].y + deltaY,
      }
      jointsMap['gou_end'] = {
        x: glyph.tempData['gou_end'].x + deltaX,
        y: glyph.tempData['gou_end'].y + deltaY,
      }
      break
    }
    case 'wan_start': {
      jointsMap['zhe_end'] = {
        x: glyph.tempData['zhe_end'].x + deltaX,
        y: glyph.tempData['zhe_end'].y + deltaY,
      }
      const newBend = getBend(jointsMap['zhe_start'], jointsMap['zhe_end'])
      jointsMap['zhe_bend'] = {
        x: newBend.x,
        y: newBend.y,
      }
      jointsMap['wan_start'] = {
        x: glyph.tempData['wan_start'].x + deltaX,
        y: glyph.tempData['wan_start'].y  + deltaY,
      }
      jointsMap['wan_end'] = {
        x: glyph.tempData['wan_end'].x + deltaX,
        y: glyph.tempData['wan_end'].y + deltaY,
      }
      jointsMap['gou_start'] = {
        x: glyph.tempData['gou_start'].x + deltaX,
        y: glyph.tempData['gou_start'].y + deltaY,
      }
      jointsMap['gou_end'] = {
        x: glyph.tempData['gou_end'].x + deltaX,
        y: glyph.tempData['gou_end'].y + deltaY,
      }
      break
    }
    case 'wan_end': {
      jointsMap['wan_end'] = {
        x: glyph.tempData['wan_end'].x + deltaX,
        y: glyph.tempData['wan_end'].y,
      }
      jointsMap['gou_start'] = {
        x: glyph.tempData['gou_start'].x + deltaX,
        y: glyph.tempData['gou_start'].y,
      }
      jointsMap['gou_end'] = {
        x: glyph.tempData['gou_end'].x + deltaX,
        y: glyph.tempData['gou_end'].y,
      }
      break
    }
    case 'gou_start': {
      jointsMap['wan_end'] = {
        x: glyph.tempData['wan_end'].x + deltaX,
        y: glyph.tempData['wan_end'].y,
      }
      jointsMap['gou_start'] = {
        x: glyph.tempData['gou_start'].x + deltaX,
        y: glyph.tempData['gou_start'].y,
      }
      jointsMap['gou_end'] = {
        x: glyph.tempData['gou_end'].x + deltaX,
        y: glyph.tempData['gou_end'].y,
      }
      break
    }
    case 'gou_end': {
      jointsMap['gou_end'] = {
        x: glyph.tempData['gou_end'].x + deltaX,
        y: glyph.tempData['gou_end'].y + deltaY,
      }
      break
    }
  }
  return jointsMap
}

const getBend = (start, end) => {
  // 改变end的情况下，不会改变弯曲度和弯曲游标，所以依据现有参数计算新的bend
  const { zhe_bendCursor: bendCursor, zhe_bendDegree: bendDegree } = params
  const horizontalSpan = Math.abs(end.x - start.x)
  const verticalSpan = Math.abs(end.y - start.y)
  const cursor_x = start.x - bendCursor * horizontalSpan
  const cursor_y = start.y + bendCursor * verticalSpan
  const angle = Math.atan2(verticalSpan, horizontalSpan)
  
  const bend = {
    x: cursor_x - bendDegree * Math.sin(angle),
    y: cursor_y - bendDegree * Math.cos(angle),
  }

  return bend
}

glyph.onSkeletonDragStart = (data) => {
  // joint数据格式：{x, y, name}
  const { draggingJoint } = data
  glyph.tempData = {}
  glyph.getJoints().map((joint) => {
    const _joint = {
      name: joint.name,
      x: joint.x,
      y: joint.y,
    }
    glyph.tempData[_joint.name] = _joint
  })
}

glyph.onSkeletonDrag = (data) => {
  if (!glyph.tempData) return
  glyph.clear()
  // joint数据格式：{x, y, name}
  const jointsMap = getJointsMap(data)
  const _params = computeParamsByJoints(jointsMap)
  updateGlyphByParams(_params, global_params)
}

glyph.onSkeletonDragEnd = (data) => {
  if (!glyph.tempData) return
  glyph.clear()
  // joint数据格式：{x, y, name}
  const jointsMap = getJointsMap(data)
  const _params = computeParamsByJoints(jointsMap)
  updateGlyphByParams(_params, global_params)
  glyph.setParam('横-长度', _params.heng_length)
  glyph.setParam('折-水平延伸', _params.zhe_horizontalSpan)
  glyph.setParam('折-竖直延伸', _params.zhe_verticalSpan)
  glyph.setParam('折-弯曲游标', _params.zhe_bendCursor)
  glyph.setParam('折-弯曲度', _params.zhe_bendDegree - 30 * global_params.bending_degree)
  glyph.setParam('弯-长度', _params.wan_length)
  glyph.setParam('钩-水平延伸', _params.gou_horizontalSpan)
  glyph.setParam('钩-竖直延伸', _params.gou_verticalSpan)
  glyph.tempData = null
}

const range = (value, range) => {
  if (value < range.min) {
    return range.min
  } else if (value > range.max) {
    return range.max
  }
  return value
}

const computeParamsByJoints = (jointsMap) => {
  const { heng_start, heng_end, zhe_start, zhe_end, zhe_bend, wan_start, wan_end, gou_start, gou_end } = jointsMap
  const heng_length_range = glyph.getParamRange('横-长度')
  const zhe_horizontal_span_range = glyph.getParamRange('折-水平延伸')
  const zhe_vertical_span_range = glyph.getParamRange('折-竖直延伸')
  const zhe_bend_cursor_range = glyph.getParamRange('折-弯曲游标')
  const zhe_bend_degree_range = glyph.getParamRange('折-弯曲度')
  const wan_length_range = glyph.getParamRange('弯-长度')
  const gou_horizontal_span_range = glyph.getParamRange('钩-水平延伸')
  const gou_vertical_span_range = glyph.getParamRange('钩-竖直延伸')
  const heng_length = range(heng_end.x - heng_start.x, heng_length_range)
  const zhe_horizontalSpan = range(zhe_start.x - zhe_end.x, zhe_horizontal_span_range)
  const zhe_verticalSpan = range(zhe_end.y - zhe_start.y, zhe_vertical_span_range)
  const zhe_data = FP.distanceAndFootPoint(zhe_start, zhe_end, zhe_bend)
  const zhe_bendCursor = range(zhe_data.percentageFromA, zhe_bend_cursor_range)
  const zhe_bendDegree = range(zhe_data.distance, zhe_bend_degree_range)
  const wan_length = range(wan_end.x - wan_start.x, wan_length_range)
  const gou_horizontalSpan = range(gou_end.x - gou_start.x, gou_horizontal_span_range)
  const gou_verticalSpan = range(gou_start.y - gou_end.y, gou_vertical_span_range)
  return {
    heng_length,
    zhe_horizontalSpan,
    zhe_verticalSpan,
    zhe_bendCursor,
    zhe_bendDegree,
    wan_length,
    gou_verticalSpan,
    gou_horizontalSpan,
    skeletonRefPos: glyph.getParam('参考位置'),
  }
}

const updateGlyphByParams = (params, global_params) => {
  const {
    heng_length,
    zhe_horizontalSpan,
    zhe_verticalSpan,
    zhe_bendCursor,
    zhe_bendDegree,
    wan_length,
    gou_horizontalSpan,
    gou_verticalSpan,
  } = params

  // 横
  const heng_start = new FP.Joint(
    'heng_start',
    {
      x: x0,
      y: y0,
    },
  )
  const heng_end = new FP.Joint(
    'heng_end',
    {
      x: heng_start.x + heng_length,
      y: heng_start.y,
    },
  )

  // 折
  const zhe_start = new FP.Joint(
    'zhe_start',
    {
      x: heng_start.x + heng_length,
      y: heng_start.y,
    },
  )
  const zhe_end = new FP.Joint(
    'zhe_end',
    {
      x: zhe_start.x - zhe_horizontalSpan,
      y: zhe_start.y + zhe_verticalSpan,
    },
  )

  const zhe_length = distance(zhe_start, zhe_end)
  const zhe_cursor_x = zhe_start.x - zhe_bendCursor * zhe_horizontalSpan
  const zhe_cursor_y = zhe_start.y + zhe_bendCursor * zhe_verticalSpan
  const zhe_angle = Math.atan2(zhe_verticalSpan, zhe_horizontalSpan)

  const zhe_bend = new FP.Joint(
    'zhe_bend',
    {
      x: zhe_cursor_x - zhe_bendDegree * Math.sin(zhe_angle),
      y: zhe_cursor_y - zhe_bendDegree * Math.cos(zhe_angle),
    },
  )

  // 弯
  const wan_start = new FP.Joint(
    'wan_start',
    {
      x: zhe_start.x - zhe_horizontalSpan,
      y: zhe_start.y + zhe_verticalSpan,
    },
  )
  const wan_end = new FP.Joint(
    'wan_end',
    {
      x: wan_start.x + wan_length,
      y: wan_start.y,
    },
  )

  // 钩
  const gou_start = new FP.Joint(
    'gou_start',
    {
      x: wan_start.x + wan_length,
      y: wan_start.y,
    },
  )
  const gou_end = new FP.Joint(
    'gou_end',
    {
      x: gou_start.x + gou_horizontalSpan,
      y: gou_start.y - gou_verticalSpan,
    },
  )

  glyph.addJoint(heng_start)
  glyph.addJoint(heng_end)
  glyph.addJoint(zhe_start)
  glyph.addJoint(zhe_bend)
  glyph.addJoint(zhe_end)
  glyph.addJoint(wan_start)
  glyph.addJoint(wan_end)
  glyph.addJoint(gou_start)
  glyph.addJoint(gou_end)

  const skeleton = {
    heng_start,
    heng_end,
    zhe_start,
    zhe_bend,
    zhe_end,
    wan_start,
    wan_end,
    gou_start,
    gou_end,
  }

  glyph.addRefLine(refline(heng_start, heng_end))
  glyph.addRefLine(refline(zhe_start, zhe_bend))
  glyph.addRefLine(refline(zhe_bend, zhe_end))
  glyph.addRefLine(refline(wan_start, wan_end))
  glyph.addRefLine(refline(gou_start, gou_end))

  const components = getComponents(skeleton, global_params)
  for (let i = 0; i < components.length; i++) {
    glyph.addComponent(components[i])
  }

  glyph.getSkeleton = () => {
    return skeleton
  }
  glyph.getComponentsBySkeleton = (skeleton) => {
    return getComponents(skeleton, global_params)
  }
}

const getComponents = (skeleton) => {
  const {
    weights_variation_power,
    start_style_type,
    start_style_value,
    turn_style_type,
    turn_style_value,
    bending_degree,
    weight,
  } = global_params

  const getStartStyle = (start_style_type, start_style_value) => {
    if (start_style_type === 1) {
      // 起笔上下凸起长方形
      return {
        start_style_decorator_width: start_style_value * 20,
        start_style_decorator_height: weight * 0.25,
      }
    } else if (start_style_type === 2) {
      // 起笔上下凸起长方形，长方形内侧转角为圆角
      return {
        start_style_decorator_width: start_style_value * 20,
        start_style_decorator_height: weight * 0.25,
        start_style_decorator_radius: 20,
      }
    }
    return {}
  }
  
  const start_style = getStartStyle(start_style_type, start_style_value)
  
  const getDistance = (p1, p2) => {
    if(!p1 || !p2) return 0
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y))
  }
  
  const getRadiusPoint = (options) => {
    const { start, end, radius } = options
    const angle = Math.atan2(end.y - start.y, end.x - start.x)
    const point = {
      x: start.x + Math.cos(angle) * radius,
      y: start.y + Math.sin(angle) * radius,
    }
    return point
  }

  // 根据骨架计算轮廓关键点
  const {
    heng_start,
    heng_end,
    zhe_start,
    zhe_bend,
    zhe_end,
    wan_start,
    wan_end,
    gou_start,
    gou_end,
  } = skeleton

  // out指右侧（外侧）轮廓线
  // in指左侧（内侧）轮廓线
  const { out_heng_start, out_heng_end, in_heng_start, in_heng_end } = FP.getLineContours('heng', { heng_start, heng_end }, weight)
  const { out_zhe_curves, out_zhe_points, in_zhe_curves, in_zhe_points } = FP.getCurveContours('zhe', { zhe_start, zhe_bend, zhe_end }, weight)
  const { out_wan_start, out_wan_end, in_wan_start, in_wan_end } = FP.getLineContours('wan', { wan_start, wan_end }, weight)
  const { out_gou_start, out_gou_end, in_gou_start, in_gou_end } = FP.getLineContours('gou', { gou_start, gou_end }, weight)
  const { corner: in_corner_heng_zhe, corner_index: in_corner_index_heng_zhe } = FP.getIntersection(
    { type: 'curve', points: in_zhe_points },
    { type: 'line', start: in_heng_start, end: in_heng_end },
  )
  const { corner: out_corner_zhe_wan, corner_index: out_corner_index_zhe_wan } = FP.getIntersection(
    { type: 'curve', points: out_zhe_points },
    { type: 'line', start: out_wan_start, end: out_wan_end },
  )
  const { corner: in_corner_zhe_wan } = FP.getIntersection(
    { type: 'line', start: in_zhe_curves[in_zhe_curves.length - 1].control2, end: in_zhe_curves[in_zhe_curves.length - 1].end },
    { type: 'line', start: in_wan_start, end: in_wan_end },
  )
  const { corner: in_corner_wan_gou } = FP.getIntersection(
    { type: 'line', start: in_wan_start, end: in_wan_end },
    { type: 'line', start: in_gou_start, end: in_gou_end },
  )
  const { corner: out_corner_wan_gou } = FP.getIntersection(
    { type: 'line', start: out_wan_start, end: out_wan_end },
    { type: 'line', start: out_gou_start, end: out_gou_end },
  )
  let { curves: in_zhe_curves_final } = FP.fitCurvesByPoints(in_zhe_points.slice(in_corner_index_heng_zhe))
  let { curves: out_zhe_curves_final } = FP.fitCurvesByPoints(out_zhe_points.slice(0, out_corner_index_zhe_wan))

  // 计算折弯拐角处内外圆角相关的点与数据
  let in_radius = 80 * bending_degree
  let out_radius = 80 * bending_degree
  // 如果in_radius超出折或弯的长度，取折或弯的最小长度
  const in_radius_min_length = Math.min(
    getDistance(in_zhe_curves_final[in_zhe_curves_final.length - 1].end, in_corner_heng_zhe),
    getDistance(in_wan_start, in_wan_end),
  )
  const out_radius_min_length = Math.min(
    getDistance(out_zhe_curves_final[out_zhe_curves_final.length - 1].end, out_corner_wan_gou),
    getDistance(out_zhe_curves_final[0].start, out_zhe_curves_final[out_zhe_curves_final.length - 1].end),
  )
  if (in_radius >= in_radius_min_length) {
    in_radius = in_radius_min_length
  }
  if (out_radius >= out_radius_min_length) {
    out_radius = out_radius_min_length
  }
  const in_radius_data = FP.getRadiusPointsOnCurve(FP.getCurvesPoints(in_zhe_curves_final), in_radius, true)
  const in_radius_control = FP.getIntersection(
    { type: 'line', start: in_radius_data.tangent.start, end: in_radius_data.tangent.end },
    { type: 'line', start: in_wan_start, end: in_wan_end },
  ).corner
  const in_radius_start = in_radius_data.point
  const in_radius_end = {
    x: in_wan_start.x + in_radius,
    y: in_wan_start.y,
  }
  const out_radius_data = FP.getRadiusPointsOnCurve(FP.getCurvesPoints(out_zhe_curves_final), out_radius, true)
  const out_radius_control = FP.getIntersection(
    { type: 'line', start: out_radius_data.tangent.start, end: out_radius_data.tangent.end },
    { type: 'line', start: out_wan_start, end: out_wan_end },
  ).corner
  const out_radius_start = out_radius_data.point
  const out_radius_end = {
    x: out_zhe_curves_final[out_zhe_curves_final.length - 1].end.x + out_radius,
    y: out_zhe_curves_final[out_zhe_curves_final.length - 1].end.y,
  }
  in_zhe_curves_final = in_radius_data.final_curves
  out_zhe_curves_final = out_radius_data.final_curves

  // 计算弯钩拐角处内外圆角相关的点与数据
  let in_radius_wan_gou = 30 * bending_degree
  let out_radius_wan_gou = 30 * bending_degree
  // 如果in_radius超出弯或钩的长度，取弯或钩的最小长度
  const in_radius_min_length_zhe_gou = Math.min(
    getDistance(in_gou_start, in_gou_end),
    getDistance(in_wan_end, in_radius_end),
  )
  const out_radius_min_length_zhe_gou = Math.min(
    getDistance(out_corner_wan_gou, out_gou_end),
    getDistance(out_corner_wan_gou, out_radius_end),
  )
  if (in_radius_wan_gou >= in_radius_min_length_zhe_gou) {
    in_radius_wan_gou = in_radius_min_length_zhe_gou
  }
  if (out_radius_wan_gou >= out_radius_min_length_zhe_gou) {
    out_radius_wan_gou = out_radius_min_length_zhe_gou
  }
  const in_radius_start_wan_gou = {
    x: in_wan_end.x - in_radius_wan_gou,
    y: in_wan_end.y,
  }
  const in_radius_end_wan_gou = getRadiusPoint({
    start: in_gou_start,
    end: in_gou_end,
    radius: in_radius_wan_gou,
  })
  const out_radius_start_wan_gou = {
    x: out_corner_wan_gou.x - out_radius_wan_gou,
    y: out_corner_wan_gou.y,
  }
  const out_radius_end_wan_gou = getRadiusPoint({
    start: out_corner_wan_gou,
    end: out_gou_end,
    radius: out_radius_wan_gou,
  })

  const start_length = 100
  const end_length = 60
  const d = 20

  const start_p14 = {
    x: in_heng_start.x + 0.25 * start_length,
    y: in_heng_start.y,
  }
  const start_p13 = {
    x: in_heng_start.x,
    y: in_heng_start.y,
  }
  const start_p12 = {
    x: in_heng_start.x,
    y: in_heng_start.y - weight / 2,
  }
  const start_p11 = {
    x: out_heng_start.x,
    y: out_heng_start.y,
  }
  const start_p10 = {
    x: out_heng_start.x + 0.15 * start_length,
    y: out_heng_start.y,
  }
  const start_p9 = {
    x: out_heng_start.x + 0.3 * start_length,
    y: out_heng_start.y,
  }
  const start_p8 = {
    x: out_heng_start.x + 0.3 * start_length,
    y: out_heng_start.y - d,
  }
  const start_p7 = {
    x: out_heng_start.x + 0.45 * start_length,
    y: out_heng_start.y - d,
  }
  const start_p6 = {
    x: out_heng_start.x + 0.6 * start_length,
    y: out_heng_start.y - d,
  }
  const start_p5 = {
    x: out_heng_start.x + 0.6 * start_length,
    y: out_heng_start.y,
  }
  const start_p4 = {
    x: out_heng_start.x + 0.9 * start_length,
    y: out_heng_start.y,
  }
  const start_p3 = {
    x: out_heng_start.x + 0.9 * start_length,
    y: out_heng_start.y + d,
  }
  const start_p2 = {
    x: out_heng_start.x + 0.6 * start_length,
    y: out_heng_start.y + d,
  }
  const start_p1 = {
    x: out_heng_start.x + 1 * start_length,
    y: out_heng_start.y + d,
  }
  const start_p0 = {
    x: out_heng_start.x + 1 * start_length,
    y: out_heng_start.y,
  }

  const gou_vecter_end = FP.turnAngle(out_gou_end, in_gou_end, -Math.PI / 4, 100)
  let { corner: gou_control } = FP.getIntersection(
    { type: 'line', start: in_radius_end_wan_gou, end: in_gou_end },
    { type: 'line', start: out_gou_end, end: gou_vecter_end },
  )
  if (!FP.isPointOnLineSegment(gou_control, in_radius_end_wan_gou, in_gou_end)) {
    gou_control = in_gou_end
  }

  // 创建钢笔组件
  const pen = new FP.PenComponent()
  pen.beginPath()

  // 按逆时针方向绘制轮廓
  // 绘制起笔样式
  pen.moveTo(start_p0.x, start_p0.y)
  pen.quadraticBezierTo(start_p1.x, start_p1.y, start_p2.x, start_p2.y)
  pen.quadraticBezierTo(start_p3.x, start_p3.y, start_p4.x, start_p4.y)
  pen.bezierTo(start_p5.x, start_p5.y, start_p6.x, start_p6.y, start_p7.x, start_p7.y)
  pen.bezierTo(start_p8.x, start_p8.y, start_p9.x, start_p9.y, start_p10.x, start_p10.y)
  pen.quadraticBezierTo(start_p11.x, start_p11.y, start_p12.x, start_p12.y)
  pen.quadraticBezierTo(start_p13.x, start_p13.y, start_p14.x, start_p14.y)

  pen.lineTo(in_zhe_curves_final[0].start.x, in_zhe_curves_final[0].start.y)
  for (let i = 0; i < in_zhe_curves_final.length; i++) {
    const curve = in_zhe_curves_final[i]
    pen.bezierTo(curve.control1.x, curve.control1.y, curve.control2.x, curve.control2.y, curve.end.x, curve.end.y)
  }
  // 绘制内侧折弯圆角
  pen.quadraticBezierTo(in_radius_control.x, in_radius_control.y, in_radius_end.x, in_radius_end.y)
  pen.lineTo(in_radius_start_wan_gou.x, in_radius_start_wan_gou.y)
  pen.quadraticBezierTo(in_corner_wan_gou.x, in_corner_wan_gou.y, in_radius_end_wan_gou.x, in_radius_end_wan_gou.y)
  
  // 绘制钩转角
  pen.quadraticBezierTo(gou_control.x, gou_control.y, out_gou_end.x, out_gou_end.y)

  // 绘制右侧（外侧）轮廓
  pen.lineTo(out_radius_end_wan_gou.x, out_radius_end_wan_gou.y)
  pen.quadraticBezierTo(out_corner_wan_gou.x, out_corner_wan_gou.y, out_radius_start_wan_gou.x, out_radius_start_wan_gou.y)
  pen.lineTo(out_radius_end.x, out_radius_end.y)
  pen.quadraticBezierTo(
    out_radius_control.x, out_radius_control.y,
    out_zhe_curves_final[out_zhe_curves_final.length - 1].end.x,
    out_zhe_curves_final[out_zhe_curves_final.length - 1].end.y,
  )
  for (let i = out_zhe_curves_final.length - 1; i >= 0; i--) {
    const curve = out_zhe_curves_final[i]
    pen.bezierTo(curve.control2.x, curve.control2.y, curve.control1.x, curve.control1.y, curve.start.x, curve.start.y)
  }
  pen.lineTo(out_zhe_curves_final[0].start.x, out_zhe_curves_final[0].start.y - weight)

  pen.lineTo(start_p0.x, start_p0.y)

  pen.closePath()
  return [ pen ]
}

updateGlyphByParams(params, global_params)