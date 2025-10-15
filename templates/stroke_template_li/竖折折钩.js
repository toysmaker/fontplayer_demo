const ox = 500
const oy = 500
const x0 = 250
const y0 = 250
const params = {
  shu_horizontalSpan: glyph.getParam('竖-水平延伸'),
  shu_verticalSpan: glyph.getParam('竖-竖直延伸'),
  zhe1_horizontalSpan: glyph.getParam('折1-水平延伸'),
  zhe1_verticalSpan: glyph.getParam('折1-竖直延伸'),
  zhe2_horizontalSpan: glyph.getParam('折2-水平延伸'),
  zhe2_verticalSpan: glyph.getParam('折2-竖直延伸'),
  gou_horizontalSpan: glyph.getParam('钩-水平延伸'),
  gou_verticalSpan: glyph.getParam('钩-竖直延伸'),
  skeletonRefPos: glyph.getParam('参考位置'),
}
const global_params = {
  weights_variation_power: glyph.getParam('字重变化'),
  start_style_type: glyph.getParam('起笔风格'),
  start_style_value: glyph.getParam('起笔数值'),
  turn_style_type: glyph.getParam('转角风格'),
  turn_style_value: glyph.getParam('转角数值'),
  end_style_type: glyph.getParam('收笔风格'),
  end_style_value: glyph.getParam('收笔数值'),
  bending_degree: glyph.getParam('弯曲程度'),
  weight: glyph.getParam('字重') || 40,
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
    case 'shu_end': {
      jointsMap['shu_end'] = {
        x: glyph.tempData['shu_end'].x + deltaX,
        y: glyph.tempData['shu_end'].y + deltaY,
      }
      jointsMap['zhe1_start'] = {
        x: glyph.tempData['zhe1_start'].x + deltaX,
        y: glyph.tempData['zhe1_start'].y + deltaY,
      }
      jointsMap['zhe1_end'] = {
        x: glyph.tempData['zhe1_end'].x + deltaX,
        y: glyph.tempData['zhe1_end'].y + deltaY,
      }
      jointsMap['zhe2_start'] = {
        x: glyph.tempData['zhe2_start'].x + deltaX,
        y: glyph.tempData['zhe2_start'].y + deltaY,
      }
      jointsMap['zhe2_end'] = {
        x: glyph.tempData['zhe2_end'].x + deltaX,
        y: glyph.tempData['zhe2_end'].y + deltaY,
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
    case 'zhe1_start': {
      jointsMap['shu_end'] = {
        x: glyph.tempData['shu_end'].x + deltaX,
        y: glyph.tempData['shu_end'].y + deltaY,
      }
      jointsMap['zhe1_start'] = {
        x: glyph.tempData['zhe1_start'].x + deltaX,
        y: glyph.tempData['zhe1_start'].y + deltaY,
      }
      jointsMap['zhe1_end'] = {
        x: glyph.tempData['zhe1_end'].x + deltaX,
        y: glyph.tempData['zhe1_end'].y + deltaY,
      }
      jointsMap['zhe2_start'] = {
        x: glyph.tempData['zhe2_start'].x + deltaX,
        y: glyph.tempData['zhe2_start'].y + deltaY,
      }
      jointsMap['zhe2_end'] = {
        x: glyph.tempData['zhe2_end'].x + deltaX,
        y: glyph.tempData['zhe2_end'].y + deltaY,
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
    case 'zhe1_end': {
      jointsMap['zhe1_end'] = {
        x: glyph.tempData['zhe1_end'].x + deltaX,
        y: glyph.tempData['zhe1_end'].y + deltaY,
      }
      jointsMap['zhe2_start'] = {
        x: glyph.tempData['zhe2_start'].x + deltaX,
        y: glyph.tempData['zhe2_start'].y + deltaY,
      }
      jointsMap['zhe2_end'] = {
        x: glyph.tempData['zhe2_end'].x + deltaX,
        y: glyph.tempData['zhe2_end'].y + deltaY,
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
    case 'zhe2_start': {
      jointsMap['zhe1_end'] = {
        x: glyph.tempData['zhe1_end'].x + deltaX,
        y: glyph.tempData['zhe1_end'].y + deltaY,
      }
      jointsMap['zhe2_start'] = {
        x: glyph.tempData['zhe2_start'].x + deltaX,
        y: glyph.tempData['zhe2_start'].y + deltaY,
      }
      jointsMap['zhe2_end'] = {
        x: glyph.tempData['zhe2_end'].x + deltaX,
        y: glyph.tempData['zhe2_end'].y + deltaY,
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
    case 'zhe2_end': {
      jointsMap['zhe2_end'] = {
        x: glyph.tempData['zhe2_end'].x + deltaX,
        y: glyph.tempData['zhe2_end'].y + deltaY,
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
    case 'gou_start': {
      jointsMap['zhe2_end'] = {
        x: glyph.tempData['zhe2_end'].x + deltaX,
        y: glyph.tempData['zhe2_end'].y + deltaY,
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
  glyph.setParam('竖-水平延伸', _params.shu_horizontalSpan)
  glyph.setParam('竖-竖直延伸', _params.shu_verticalSpan)
  glyph.setParam('折1-水平延伸', _params.zhe1_horizontalSpan)
  glyph.setParam('折1-竖直延伸', _params.zhe1_verticalSpan)
  glyph.setParam('折2-水平延伸', _params.zhe2_horizontalSpan)
  glyph.setParam('折2-竖直延伸', _params.zhe2_verticalSpan)
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
  const { shu_start, shu_end, zhe1_start, zhe1_end, zhe2_start, zhe2_end, gou_start, gou_end } = jointsMap
  const shu_horizontal_span_range = glyph.getParamRange('竖-水平延伸')
  const shu_vertical_span_range = glyph.getParamRange('竖-竖直延伸')
  const zhe1_horizontal_span_range = glyph.getParamRange('折1-水平延伸')
  const zhe1_vertical_span_range = glyph.getParamRange('折1-竖直延伸')
  const zhe2_horizontal_span_range = glyph.getParamRange('折2-水平延伸')
  const zhe2_vertical_span_range = glyph.getParamRange('折2-竖直延伸')
  const gou_horizontal_span_range = glyph.getParamRange('钩-水平延伸')
  const gou_vertical_span_range = glyph.getParamRange('钩-竖直延伸')
  const shu_horizontalSpan = range(shu_end.x - shu_start.x, shu_horizontal_span_range)
  const shu_verticalSpan = range(shu_end.y - shu_start.y, shu_vertical_span_range)
  const zhe1_horizontalSpan = range(zhe1_end.x - zhe1_start.x, zhe1_horizontal_span_range)
  const zhe1_verticalSpan = range(zhe1_start.y - zhe1_end.y, zhe1_vertical_span_range)
  const zhe2_horizontalSpan = range(zhe2_start.x - zhe2_end.x, zhe2_horizontal_span_range)
  const zhe2_verticalSpan = range(zhe2_end.y - zhe2_start.y, zhe2_vertical_span_range)
  const gou_horizontalSpan = range(gou_start.x - gou_end.x, gou_horizontal_span_range)
  const gou_verticalSpan = range(gou_end.y - gou_start.y, gou_vertical_span_range)
  return {
    shu_horizontalSpan,
    shu_verticalSpan,
    zhe1_horizontalSpan,
    zhe1_verticalSpan,
    zhe2_horizontalSpan,
    zhe2_verticalSpan,
    gou_horizontalSpan,
    gou_verticalSpan,
    skeletonRefPos: glyph.getParam('参考位置'),
  }
}

const updateGlyphByParams = (params, global_params) => {
  const {
    shu_horizontalSpan,
    shu_verticalSpan,
    zhe1_horizontalSpan,
    zhe1_verticalSpan,
    zhe2_horizontalSpan,
    zhe2_verticalSpan,
    gou_horizontalSpan,
    gou_verticalSpan,
    skeletonRefPos,
  } = params
  const { weight } = global_params

  const _weight = weight * 1.5

  // 竖
  let shu_start, shu_end
  const shu_start_ref = new FP.Joint(
    'shu_start_ref',
    {
      x: x0,
      y: y0,
    },
  )
  const shu_end_ref = new FP.Joint(
    'shu_end_ref',
    {
      x: shu_start_ref.x + shu_horizontalSpan,
      y: shu_start_ref.y + shu_verticalSpan,
    },
  )
  if (skeletonRefPos === 1) {
    // 骨架参考位置为右侧（上侧）
    shu_start = new FP.Joint(
      'shu_start',
      {
        x: shu_start_ref.x - _weight / 2,
        y: shu_start_ref.y,
      },
    )
    shu_end = new FP.Joint(
      'shu_end',
      {
        x: shu_end_ref.x - _weight / 2,
        y: shu_end_ref.y,
      },
    )
  } else if (skeletonRefPos === 2) {
    // 骨架参考位置为左侧（下侧）
    shu_start = new FP.Joint(
      'shu_start',
      {
        x: shu_start_ref.x + _weight / 2,
        y: shu_start_ref.y,
      },
    )
    shu_end = new FP.Joint(
      'shu_end',
      {
        x: shu_end_ref.x + _weight / 2,
        y: shu_end_ref.y,
      },
    )
  } else {
    // 默认骨架参考位置，即骨架参考位置为中间实际绘制的骨架位置
    shu_start = new FP.Joint(
      'shu_start',
      {
        x: shu_start_ref.x,
        y: shu_start_ref.y,
      },
    )
    shu_end = new FP.Joint(
      'shu_end',
      {
        x: shu_end_ref.x,
        y: shu_end_ref.y,
      },
    )
  }
  glyph.addJoint(shu_start_ref)
  glyph.addJoint(shu_end_ref)
  glyph.addRefLine(refline(shu_start_ref, shu_end_ref, 'ref'))

  // 折1
  const zhe1_start = new FP.Joint(
    'zhe1_start',
    {
      x: shu_end.x,
      y: shu_end.y,
    },
  )
  const zhe1_end = new FP.Joint(
    'zhe1_end',
    {
      x: zhe1_start.x + zhe1_horizontalSpan,
      y: zhe1_start.y - zhe1_verticalSpan,
    },
  )

  // 折2
  const zhe2_start = new FP.Joint(
    'zhe2_start',
    {
      x: zhe1_end.x,
      y: zhe1_end.y,
    },
  )
  const zhe2_end = new FP.Joint(
    'zhe2_end',
    {
      x: zhe2_start.x - zhe2_horizontalSpan,
      y: zhe2_start.y + zhe2_verticalSpan,
    },
  )

  // 钩
  const gou_start = new FP.Joint(
    'gou_start',
    {
      x: zhe2_start.x - zhe2_horizontalSpan,
      y: zhe2_start.y + zhe2_verticalSpan,
    },
  )
  const gou_end = new FP.Joint(
    'gou_end',
    {
      x: gou_start.x - gou_horizontalSpan,
      y: gou_start.y + gou_verticalSpan,
    },
  )

  glyph.addJoint(shu_start)
  glyph.addJoint(shu_end)
  glyph.addJoint(zhe1_start)
  glyph.addJoint(zhe1_end)
  glyph.addJoint(zhe2_start)
  glyph.addJoint(zhe2_end)
  glyph.addJoint(gou_start)
  glyph.addJoint(gou_end)

  const skeleton = {
    shu_start,
    shu_end,
    zhe1_start,
    zhe1_end,
    zhe2_start,
    zhe2_end,
    gou_start,
    gou_end,
  }

  glyph.addRefLine(refline(shu_start, shu_end))
  glyph.addRefLine(refline(zhe1_start, zhe1_end))
  glyph.addRefLine(refline(zhe2_start, zhe2_end))
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
  let {
    weights_variation_power,
    start_style_type,
    start_style_value,
    turn_style_type,
    turn_style_value,
    end_style_type,
    end_style_value,
    bending_degree,
    weight,
  } = global_params

  const getStartStyle = (start_style_type, start_style_value) => {
    if (start_style_type === 1) {
      // 起笔上下凸起长方形
      return {
        start_style_decorator_height: start_style_value * 20,
        start_style_decorator_width: weight * 0.25,
      }
    } else if (start_style_type === 2) {
      // 起笔上下凸起长方形，长方形内侧转角为圆角
      return {
        start_style_decorator_height: start_style_value * 20,
        start_style_decorator_width: weight * 0.25,
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
    shu_start,
    shu_end,
    zhe1_start,
    zhe1_end,
    zhe2_start,
    zhe2_end,
    gou_start,
    gou_end,
  } = skeleton

  const turn_angle_1 = FP.degreeToRadius(10)
  const turn_angle_2 = FP.degreeToRadius(15)
  const _weight = weight * 1.5

  // out指右侧（外侧）轮廓线
  // in指左侧（内侧）轮廓线
  const { out_shu_start, out_shu_end, in_shu_start, in_shu_end } = FP.getLineContours('shu', { shu_start, shu_end }, _weight)
  const { out_zhe1_start, out_zhe1_end, in_zhe1_start, in_zhe1_end } = FP.getLineContours('zhe1', { zhe1_start, zhe1_end }, _weight)
  const { out_zhe2_start, out_zhe2_end, in_zhe2_start, in_zhe2_end } = FP.getLineContours('zhe2', { zhe2_start, zhe2_end }, _weight)
  const { out_gou_start, out_gou_end, in_gou_start, in_gou_end } = FP.getLineContours('gou', { gou_start, gou_end }, _weight, {
    startWeight: _weight,
    endWeight: _weight * 0.25,
  })
  let { corner: in_corner_shu_zhe1 } = FP.getIntersection(
    { type: 'line', start: in_shu_start, end: in_shu_end },
    { type: 'line', start: in_zhe1_start, end: in_zhe1_end },
  )
  let { corner: out_corner_shu_zhe1 } = FP.getIntersection(
    { type: 'line', start: out_shu_start, end: out_shu_end },
    { type: 'line', start: out_zhe1_start, end: out_zhe1_end },
  )
  const { corner: in_corner_zhe1_zhe2 } = FP.getIntersection(
    { type: 'line', start: in_zhe1_start, end: in_zhe1_end },
    { type: 'line', start: in_zhe2_start, end: in_zhe2_end },
  )
  const { corner: out_corner_zhe1_zhe2 } = FP.getIntersection(
    { type: 'line', start: out_zhe1_start, end: out_zhe1_end },
    { type: 'line', start: out_zhe2_start, end: out_zhe2_end },
  )
  const { corner: in_corner_zhe2_gou } = FP.getIntersection(
    { type: 'line', start: in_zhe2_start, end: in_zhe2_end },
    { type: 'line', start: in_gou_start, end: in_gou_end },
  )
  const { corner: out_corner_zhe2_gou } = FP.getIntersection(
    { type: 'line', start: out_zhe2_start, end: out_zhe2_end },
    { type: 'line', start: out_gou_start, end: out_gou_end },
  )

  // 计算折1折2拐角处内外圆角相关的点与数据
  let in_radius_zhe1_zhe2 = 60 * bending_degree
  let out_radius_zhe1_zhe2 = 80 * bending_degree
  // 如果in_radius超出折1或折2长度，取折1或折2的最小长度
  const in_radius_min_length_zhe1_zhe2 = Math.min(
    getDistance(in_corner_zhe1_zhe2, in_corner_shu_zhe1),
    getDistance(in_corner_zhe1_zhe2, in_corner_zhe2_gou),
  )
  const out_radius_min_length_zhe1_zhe2 = Math.min(
    getDistance(out_zhe1_end, out_corner_shu_zhe1),
    getDistance(out_zhe2_start, out_zhe2_end),
  )
  if (in_radius_zhe1_zhe2 >= in_radius_min_length_zhe1_zhe2) {
    in_radius_zhe1_zhe2 = in_radius_min_length_zhe1_zhe2
  }
  if (out_radius_zhe1_zhe2 >= out_radius_min_length_zhe1_zhe2) {
    out_radius_zhe1_zhe2 = out_radius_min_length_zhe1_zhe2
  }
  const in_radius_start_zhe1_zhe2= FP.getPointOnLine(in_corner_zhe1_zhe2, in_zhe1_start, in_radius_zhe1_zhe2)
  const in_radius_end_zhe1_zhe2 = getRadiusPoint({
    start: in_corner_zhe1_zhe2,
    end: in_corner_zhe2_gou,
    radius: in_radius_zhe1_zhe2,
  })
  const out_radius_start_zhe1_zhe2 = FP.getPointOnLine(out_corner_zhe1_zhe2, out_zhe1_start, out_radius_zhe1_zhe2)
  const out_radius_end_zhe1_zhe2 = getRadiusPoint({
    start: out_corner_zhe1_zhe2,
    end: out_corner_zhe2_gou,
    radius: out_radius_zhe1_zhe2,
  })

  // 计算折2钩拐角处内外圆角相关的点与数据
  let in_radius_zhe2_gou = 30 * bending_degree
  let out_radius_zhe2_gou = 10 * bending_degree
  // 如果in_radius超出折2或钩的长度，取折2或钩的最小长度
  const in_radius_min_length_zhe2_gou = Math.min(
    getDistance(in_corner_zhe2_gou, in_gou_end),
    getDistance(in_corner_zhe2_gou, in_radius_end_zhe1_zhe2),
  )
  const out_radius_min_length_zhe2_gou = Math.min(
    getDistance(gou_start, gou_end),
    getDistance(out_zhe2_end, out_radius_end_zhe1_zhe2),
  )
  if (in_radius_zhe2_gou >= in_radius_min_length_zhe2_gou) {
    in_radius_zhe2_gou = in_radius_min_length_zhe2_gou
  }
  if (out_radius_zhe2_gou >= out_radius_min_length_zhe2_gou) {
    out_radius_zhe2_gou = out_radius_min_length_zhe2_gou
  }
  const in_radius_start_zhe2_gou = getRadiusPoint({
    start: in_corner_zhe2_gou,
    end: in_corner_zhe1_zhe2,
    radius: in_radius_zhe2_gou,
  })
  const in_radius_end_zhe2_gou = getRadiusPoint({
    start: in_corner_zhe2_gou,
    end: in_gou_end,
    radius: in_radius_zhe2_gou,
  })
  const out_radius_start_zhe2_gou = getRadiusPoint({
    start: out_zhe2_end,
    end: out_radius_end_zhe1_zhe2,
    radius: Math.min(out_radius_zhe2_gou * 2, FP.distance(zhe2_start, zhe2_end) * 0.5),
  })
  const out_radius_end_zhe2_gou = getRadiusPoint({
    start: out_gou_start,
    end: out_gou_end,
    radius: Math.min(out_radius_zhe2_gou * 2, FP.distance(gou_start, gou_end) * 0.5),
  })

  let turn_data = {}
  {
    // 计算转角风格1（凸起，圆滑连接）所需要的数据
    const turn_length = 20 * turn_style_value
    const { inner_angle, mid_angle, angle1, angle2 } = FP.getTurnAngles(out_zhe1_start, out_corner_zhe1_zhe2, out_zhe2_end)
    const inner_corner_length = _weight
    const corner_radius = (inner_corner_length / 2) / Math.sin(inner_angle / 2)
    const turn_control_1 = FP.getPointOnLine(out_corner_zhe1_zhe2, out_zhe1_start, corner_radius)
    // {
    //   x: out_corner_zhe1_zhe2.x - corner_radius,
    //   y: out_corner_zhe1_zhe2.y,
    // }
    const turn_start_1 = FP.getPointOnLine(turn_control_1, out_zhe1_start, corner_radius)
    // {
    //   x: turn_control_1.x - corner_radius,
    //   y: turn_control_1.y,
    // }
    const turn_end_1 = {
      x: turn_control_1.x + turn_length * Math.cos(mid_angle),
      y: turn_control_1.y - turn_length * Math.sin(mid_angle),
    }
    const turn_control_2 = getRadiusPoint({
      start: out_corner_zhe1_zhe2,
      end: out_zhe2_end,
      radius: corner_radius,
    })
    const turn_start_2 = getRadiusPoint({
      start: turn_control_2,
      end: out_zhe2_end,
      radius: corner_radius,
    })
    const turn_end_2 = {
      x: turn_control_2.x + turn_length * Math.cos(mid_angle),
      y: turn_control_2.y - turn_length * Math.sin(mid_angle),
    }
    turn_data = {
      turn_start_1,
      turn_control_1,
      turn_end_1,
      turn_start_2,
      turn_control_2,
      turn_end_2,
    }
  }

  const radius = 30
  const startRightAngle = FP.degreeToRadius(-(10 + 5 * start_style_value))
  const startLeftAngle = FP.degreeToRadius(15 + 5 * start_style_value)
  const startTopAngle = FP.degreeToRadius(-20)
  const start_length = Math.min(30, FP.distance(shu_start, shu_end) * 0.2)
  const endRightAngle = FP.degreeToRadius(25 + 5 * end_style_value)
  const endLeftAngle = FP.degreeToRadius(-(0 + 5 * end_style_value))
  const endBottomAngle = FP.degreeToRadius(20)
  const end_length = Math.min(60, FP.distance(zhe2_start, zhe2_end) * 0.3)
  const d = 3 + 3 * weights_variation_power
  const l = FP.distance(shu_start, shu_end)
  const control_length = Math.min((l * 0.5 - start_length) * 0.8, l * 0.5 - end_length, 45)
  const l_zhe1 = FP.distance(zhe1_start, zhe1_end)
  const l_zhe2 = FP.distance(zhe2_start, zhe2_end)
  const control_length_zhe1 = Math.min(l_zhe1 * 0.3, 45)
  const control_length_zhe2 = Math.min(l_zhe2 * 0.3, 45)

  const start_p7 = FP.getPointOnLine(out_shu_start, out_shu_end, start_length)
  const start_p4 = FP.getPointOnLine(in_shu_start, in_shu_end, start_length)
  const start_p7_p6_vector = FP.turnAngleFromEnd(out_shu_end, start_p7, startRightAngle, 100)
  const start_p4_p5_vector = FP.turnAngleFromEnd(in_shu_end, start_p4, startLeftAngle, 100)
  const start_p5_p6_vector = FP.turnAngleFromStart(shu_start, out_shu_start, startTopAngle, 100)
  const { corner: start_p6 } = FP.getIntersection(
    { type: 'line', start: start_p7, end: start_p7_p6_vector },
    { type: 'line', start: shu_start, end: start_p5_p6_vector }
  )
  const { corner: start_p5 } = FP.getIntersection(
    { type: 'line', start: start_p4, end: start_p4_p5_vector },
    { type: 'line', start: shu_start, end: start_p5_p6_vector }
  )

  const start_p11 = FP.turnLeft(out_shu_end, FP.getPointOnLine(out_shu_end, out_shu_start, l * 0.5 - control_length), d)
  const start_p10 = FP.turnLeft(out_shu_end, FP.getPointOnLine(out_shu_end, out_shu_start, l * 0.5), d)
  const start_p9 = FP.turnLeft(out_shu_end, FP.getPointOnLine(out_shu_end, out_shu_start, l * 0.5 + control_length), d)
  const start_p0 = FP.turnRight(in_shu_end, FP.getPointOnLine(in_shu_end, in_shu_start, l * 0.5 - control_length), d)
  const start_p1 = FP.turnRight(in_shu_end, FP.getPointOnLine(in_shu_end, in_shu_start, l * 0.5), d)
  const start_p2 = FP.turnRight(in_shu_end, FP.getPointOnLine(in_shu_end, in_shu_start, l * 0.5 + control_length), d)

  const start_p3 = FP.getPointOnLine(start_p2, start_p4, FP.distance(start_p2, start_p4) * 0.5)
  const start_p8 = FP.getPointOnLine(start_p7, start_p9, FP.distance(start_p7, start_p9) * 0.5)

  const start_p6_radius_before = FP.getPointOnLine(start_p6, start_p5, radius)
  const start_p6_radius_after = FP.getPointOnLine(start_p6, start_p7, radius)
  const start_p5_radius_before = FP.getPointOnLine(start_p5, start_p4, radius)
  const start_p5_radius_after = FP.getPointOnLine(start_p5, start_p6, radius)

  const out_turn_p2 = FP.turnLeft(out_zhe1_end, FP.getPointOnLine(out_zhe1_end, out_zhe1_start, l_zhe1 * 0.5 - control_length_zhe1), d)
  const out_turn_p1 = FP.turnLeft(out_zhe1_end, FP.getPointOnLine(out_zhe1_end, out_zhe1_start, l_zhe1 * 0.5), d)
  const out_turn_p0 = FP.turnLeft(out_zhe1_end, FP.getPointOnLine(out_zhe1_end, out_zhe1_start, l_zhe1 * 0.5 + control_length_zhe1), d)
  const in_turn_p2 = FP.turnRight(in_zhe1_end, FP.getPointOnLine(in_zhe1_end, in_zhe1_start, l_zhe1 * 0.5 - control_length_zhe1), d)
  const in_turn_p1 = FP.turnRight(in_zhe1_end, FP.getPointOnLine(in_zhe1_end, in_zhe1_start, l_zhe1 * 0.5), d)
  const in_turn_p0 = FP.turnRight(in_zhe1_end, FP.getPointOnLine(in_zhe1_end, in_zhe1_start, l_zhe1 * 0.5 + control_length_zhe1), d)
  const out_turn_p3 = turn_data.turn_start_1
  const out_turn_p6 = turn_data.turn_control_2
  const turn_p4_vector = FP.turnAngleFromStart(turn_data.turn_control_1, turn_data.turn_end_1, turn_angle_1, 100)
  const turn_p5_vector = FP.turnAngleFromStart(out_turn_p6, turn_data.turn_end_2, -turn_angle_2, 100)
  const { corner: out_turn_p4 } = FP.getIntersection(
    { type: 'line', start: turn_data.turn_control_1, end: turn_p4_vector },
    { type: 'line', start: turn_data.turn_end_2, end: turn_data.turn_end_1 }
  )
  const { corner: out_turn_p5 } = FP.getIntersection(
    { type: 'line', start: out_turn_p6, end: turn_p5_vector },
    { type: 'line', start: turn_data.turn_end_2, end: turn_data.turn_end_1 }
  )
  const out_turn_p9 = FP.turnLeft(out_zhe2_end, FP.getPointOnLine(out_zhe2_end, out_zhe2_start, l_zhe2 * 0.5 - control_length_zhe2), d)
  const out_turn_p8 = FP.turnLeft(out_zhe2_end, FP.getPointOnLine(out_zhe2_end, out_zhe2_start, l_zhe2 * 0.5), d)
  const out_turn_p7 = FP.turnLeft(out_zhe2_end, FP.getPointOnLine(out_zhe2_end, out_zhe2_start, l_zhe2 * 0.5 + control_length_zhe2), d)
  const in_turn_p6 = FP.turnRight(in_zhe2_end, FP.getPointOnLine(in_zhe2_end, in_zhe2_start, l_zhe2 * 0.5 - control_length_zhe2), d)
  const in_turn_p5 = FP.turnRight(in_zhe2_end, FP.getPointOnLine(in_zhe2_end, in_zhe2_start, l_zhe2 * 0.5), d)
  const in_turn_p4 = FP.turnRight(in_zhe2_end, FP.getPointOnLine(in_zhe2_end, in_zhe2_start, l_zhe2 * 0.5 + control_length_zhe2), d)
  const in_turn_p3 = in_corner_zhe1_zhe2

  const out_turn_p4_radius_before = FP.getPointOnLine(out_turn_p4, out_turn_p3, FP.distance(out_turn_p4, out_turn_p3) * 0.7)
  const out_turn_p4_radius_after = FP.getPointOnLine(out_turn_p4, out_turn_p5, FP.distance(out_turn_p4, out_turn_p5) * 0.4)
  const out_turn_p5_radius_before = FP.getPointOnLine(out_turn_p5, out_turn_p4, FP.distance(out_turn_p5, out_turn_p4) * 0.4)
  const out_turn_p5_radius_after = FP.getPointOnLine(out_turn_p5, out_turn_p6, FP.distance(out_turn_p5, out_turn_p6) * 0.7)
  const in_turn_p3_radius_before = FP.getPointOnLine(in_turn_p3, in_turn_p2, radius)
  const in_turn_p3_radius_after = FP.getPointOnLine(in_turn_p3, in_turn_p4, radius)

  in_corner_shu_zhe1 = FP.getIntersection(
    { type: 'line', start: in_turn_p2, end: in_turn_p1 },
    { type: 'line', start: start_p1, end: start_p2 },
  ).corner
  out_corner_shu_zhe1 = FP.getIntersection(
    { type: 'line', start: out_turn_p2, end: out_turn_p1 },
    { type: 'line', start: start_p10, end: start_p11 },
  ).corner

  const end_p0 = out_radius_start_zhe2_gou
  const end_p3 = out_radius_end_zhe2_gou
  const end_p1 = FP.getPointOnLine(out_radius_start_zhe2_gou, out_corner_zhe2_gou, FP.distance(out_radius_start_zhe2_gou, out_corner_zhe2_gou) * 0.5)
  const end_p2 = FP.getPointOnLine(out_radius_end_zhe2_gou, out_corner_zhe2_gou, FP.distance(out_radius_end_zhe2_gou, out_corner_zhe2_gou) * 0.5)
  const end_p4 = out_gou_end
  const end_p5 = in_gou_end
  const end_p4_radius_before = FP.getPointOnLine(end_p4, end_p3, radius)
  const end_p5_radius_after = FP.getPointOnLine(end_p5, in_corner_zhe2_gou, radius)

  const in_corner_shu_zhe1_radius_before = FP.getPointOnLine(in_corner_shu_zhe1, start_p0, radius)
  const in_corner_shu_zhe1_radius_after = FP.getPointOnLine(in_corner_shu_zhe1, in_turn_p0, radius)

  const out_corner_shu_zhe1_radius_before = FP.getPointOnLine(out_corner_shu_zhe1, out_turn_p0, radius)
  const out_corner_shu_zhe1_radius_after = FP.getPointOnLine(out_corner_shu_zhe1, start_p11, radius)

  // 创建钢笔组件
  const pen = new FP.PenComponent()
  pen.beginPath()

  // 按逆时针方向绘制轮廓
  pen.moveTo(start_p10.x, start_p10.y)
  pen.quadraticBezierTo(start_p9.x, start_p9.y, start_p8.x, start_p8.y)
  pen.quadraticBezierTo(start_p7.x, start_p7.y, start_p6_radius_after.x, start_p6_radius_after.y)
  pen.quadraticBezierTo(start_p6.x, start_p6.y, start_p6_radius_before.x, start_p6_radius_before.y)
  pen.lineTo(start_p5_radius_after.x, start_p5_radius_after.y)
  pen.quadraticBezierTo(start_p5.x, start_p5.y, start_p5_radius_before.x, start_p5_radius_before.y)
  pen.quadraticBezierTo(start_p4.x, start_p4.y, start_p3.x, start_p3.y)
  pen.quadraticBezierTo(start_p2.x, start_p2.y, start_p1.x, start_p1.y)
  pen.quadraticBezierTo(start_p0.x, start_p0.y, in_corner_shu_zhe1_radius_before.x, in_corner_shu_zhe1_radius_before.y)

  pen.quadraticBezierTo(in_corner_shu_zhe1.x, in_corner_shu_zhe1.y, in_corner_shu_zhe1_radius_after.x, in_corner_shu_zhe1_radius_after.y)

  pen.quadraticBezierTo(in_turn_p0.x, in_turn_p0.y, in_turn_p1.x, in_turn_p1.y)
  pen.quadraticBezierTo(in_turn_p2.x, in_turn_p2.y, in_turn_p3_radius_before.x, in_turn_p3_radius_before.y)
  pen.quadraticBezierTo(in_turn_p3.x, in_turn_p3.y, in_turn_p3_radius_after.x, in_turn_p3_radius_after.y)
  pen.quadraticBezierTo(in_turn_p4.x, in_turn_p4.y, in_turn_p5.x, in_turn_p5.y)
  pen.quadraticBezierTo(in_turn_p6.x, in_turn_p6.y, in_radius_start_zhe2_gou.x, in_radius_start_zhe2_gou.y)

  pen.quadraticBezierTo(in_corner_zhe2_gou.x, in_corner_zhe2_gou.y, in_radius_end_zhe2_gou.x, in_radius_end_zhe2_gou.y)
  pen.lineTo(end_p5_radius_after.x, end_p5_radius_after.y)
  pen.bezierTo(end_p5.x, end_p5.y, end_p4.x, end_p4.y, end_p4_radius_before.x, end_p4_radius_before.y)
  pen.lineTo(end_p3.x, end_p3.y)
  pen.bezierTo(end_p2.x, end_p2.y, end_p1.x, end_p1.y, end_p0.x, end_p0.y)

  pen.quadraticBezierTo(out_turn_p9.x, out_turn_p9.y, out_turn_p8.x, out_turn_p8.y)
  pen.bezierTo(out_turn_p7.x, out_turn_p7.y, out_turn_p6.x, out_turn_p6.y, out_turn_p5_radius_after.x, out_turn_p5_radius_after.y)
  pen.quadraticBezierTo(out_turn_p5.x, out_turn_p5.y, out_turn_p5_radius_before.x, out_turn_p5_radius_before.y)
  pen.lineTo(out_turn_p4_radius_after.x, out_turn_p4_radius_after.y)
  pen.quadraticBezierTo(out_turn_p4.x, out_turn_p4.y, out_turn_p4_radius_before.x, out_turn_p4_radius_before.y)
  pen.bezierTo(out_turn_p3.x, out_turn_p3.y, out_turn_p2.x, out_turn_p2.y, out_turn_p1.x, out_turn_p1.y)
  pen.quadraticBezierTo(out_turn_p0.x, out_turn_p0.y, out_corner_shu_zhe1_radius_before.x, out_corner_shu_zhe1_radius_before.y)
  pen.quadraticBezierTo(out_corner_shu_zhe1.x, out_corner_shu_zhe1.y, out_corner_shu_zhe1_radius_after.x, out_corner_shu_zhe1_radius_after.y)

  pen.quadraticBezierTo(start_p11.x, start_p11.y, start_p10.x, start_p10.y)

  pen.closePath()
  return [ pen ]
}

updateGlyphByParams(params, global_params)