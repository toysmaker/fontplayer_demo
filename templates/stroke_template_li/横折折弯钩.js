const ox = 500
const oy = 500
const x0 = 325
const y0 = 255
const params = {
  heng_horizontalSpan: glyph.getParam('横-水平延伸'),
  heng_verticalSpan: glyph.getParam('横-竖直延伸'),
  zhe1_horizontalSpan: glyph.getParam('折1-水平延伸'),
  zhe1_verticalSpan: glyph.getParam('折1-竖直延伸'),
  zhe2_horizontalSpan: glyph.getParam('折2-水平延伸'),
  zhe2_verticalSpan: glyph.getParam('折2-竖直延伸'),
  wan_horizontalSpan: glyph.getParam('弯-水平延伸'),
  wan_verticalSpan: glyph.getParam('弯-竖直延伸'),
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
  heng_wave_momentum: glyph.getParam('横-拱势'),
  zhe2_wave_momentum: glyph.getParam('折2-拱势'),
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
    case 'heng_end': {
      jointsMap['heng_end'] = {
        x: glyph.tempData['heng_end'].x + deltaX,
        y: glyph.tempData['heng_end'].y + deltaY,
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
      jointsMap['wan_start'] = {
        x: glyph.tempData['wan_start'].x + deltaX,
        y: glyph.tempData['wan_start'].y + deltaY,
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
    case 'zhe1_start': {
      jointsMap['heng_end'] = {
        x: glyph.tempData['heng_end'].x + deltaX,
        y: glyph.tempData['heng_end'].y + deltaY,
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
      jointsMap['wan_start'] = {
        x: glyph.tempData['wan_start'].x + deltaX,
        y: glyph.tempData['wan_start'].y + deltaY,
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
    case 'zhe1_end': {
      jointsMap['zhe1_end'] = {
        x: glyph.tempData['zhe1_end'].x + deltaX,
        y: glyph.tempData['zhe1_end'].y + deltaY,
      }
      jointsMap['zhe2_start'] = {
        x: glyph.tempData['zhe2_start'].x + deltaX,
        y: glyph.tempData['zhe2_start'].y  + deltaY,
      }
      jointsMap['zhe2_end'] = {
        x: glyph.tempData['zhe2_end'].x + deltaX,
        y: glyph.tempData['zhe2_end'].y + deltaY,
      }
      jointsMap['wan_start'] = {
        x: glyph.tempData['wan_start'].x + deltaX,
        y: glyph.tempData['wan_start'].y + deltaY,
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
    case 'zhe2_start': {
      jointsMap['zhe1_end'] = {
        x: glyph.tempData['zhe1_end'].x + deltaX,
        y: glyph.tempData['zhe1_end'].y + deltaY,
      }
      jointsMap['zhe2_start'] = {
        x: glyph.tempData['zhe2_start'].x + deltaX,
        y: glyph.tempData['zhe2_start'].y  + deltaY,
      }
      jointsMap['zhe2_end'] = {
        x: glyph.tempData['zhe2_end'].x + deltaX,
        y: glyph.tempData['zhe2_end'].y + deltaY,
      }
      jointsMap['wan_start'] = {
        x: glyph.tempData['wan_start'].x + deltaX,
        y: glyph.tempData['wan_start'].y + deltaY,
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
    case 'zhe2_end': {
      jointsMap['zhe2_end'] = {
        x: glyph.tempData['zhe2_end'].x + deltaX,
        y: glyph.tempData['zhe2_end'].y + deltaY,
      }
      jointsMap['wan_start'] = {
        x: glyph.tempData['wan_start'].x + deltaX,
        y: glyph.tempData['wan_start'].y + deltaY,
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
      jointsMap['zhe2_end'] = {
        x: glyph.tempData['zhe2_end'].x + deltaX,
        y: glyph.tempData['zhe2_end'].y + deltaY,
      }
      jointsMap['wan_start'] = {
        x: glyph.tempData['wan_start'].x + deltaX,
        y: glyph.tempData['wan_start'].y + deltaY,
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
    case 'gou_start': {
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
  glyph.setParam('横-水平延伸', _params.heng_horizontalSpan)
  glyph.setParam('横-竖直延伸', _params.heng_verticalSpan)
  glyph.setParam('折1-水平延伸', _params.zhe1_horizontalSpan)
  glyph.setParam('折1-竖直延伸', _params.zhe1_verticalSpan)
  glyph.setParam('折2-水平延伸', _params.zhe2_horizontalSpan)
  glyph.setParam('折2-竖直延伸', _params.zhe2_verticalSpan)
  glyph.setParam('弯-水平延伸', _params.wan_horizontalSpan)
  glyph.setParam('弯-竖直延伸', _params.wan_verticalSpan)
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
  const { heng_start, heng_end, zhe1_start, zhe1_end, zhe2_start, zhe2_end, wan_start, wan_end, gou_start, gou_end } = jointsMap
  const heng_horizontal_span_range = glyph.getParamRange('横-水平延伸')
  const heng_vertical_span_range = glyph.getParamRange('横-竖直延伸')
  const zhe1_horizontal_span_range = glyph.getParamRange('折1-水平延伸')
  const zhe1_vertical_span_range = glyph.getParamRange('折1-竖直延伸')
  const zhe2_horizontal_span_range = glyph.getParamRange('折2-水平延伸')
  const zhe2_vertical_span_range = glyph.getParamRange('折2-竖直延伸')
  const wan_horizontal_span_range = glyph.getParamRange('弯-水平延伸')
  const wan_vertical_span_range = glyph.getParamRange('弯-竖直延伸')
  const gou_horizontal_span_range = glyph.getParamRange('钩-水平延伸')
  const gou_vertical_span_range = glyph.getParamRange('钩-竖直延伸')
  const heng_horizontalSpan = range(heng_end.x - heng_start.x, heng_horizontal_span_range)
  const heng_verticalSpan = range(heng_start.y - heng_end.y, heng_vertical_span_range)
  const zhe1_horizontalSpan = range(zhe1_start.x - zhe1_end.x, zhe1_horizontal_span_range)
  const zhe1_verticalSpan = range(zhe1_end.y - zhe1_start.y, zhe1_vertical_span_range)
  const zhe2_horizontalSpan = range(zhe2_end.x - zhe2_start.x, zhe2_horizontal_span_range)
  const zhe2_verticalSpan = range(zhe2_start.y - zhe2_end.y, zhe2_vertical_span_range)
  const wan_horizontalSpan = range(wan_start.x - wan_end.x, wan_horizontal_span_range)
  const wan_verticalSpan = range(wan_end.y - wan_start.y, wan_vertical_span_range)
  const gou_horizontalSpan = range(gou_start.x - gou_end.x, gou_horizontal_span_range)
  const gou_verticalSpan = range(gou_end.y - gou_start.y, gou_vertical_span_range)
  return {
    heng_horizontalSpan,
    heng_verticalSpan,
    zhe1_horizontalSpan,
    zhe1_verticalSpan,
    zhe2_horizontalSpan,
    zhe2_verticalSpan,
    wan_horizontalSpan,
    wan_verticalSpan,
    gou_horizontalSpan,
    gou_verticalSpan,
    skeletonRefPos: glyph.getParam('参考位置'),
  }
}

const updateGlyphByParams = (params, global_params) => {
  const {
    heng_horizontalSpan,
    heng_verticalSpan,
    zhe1_horizontalSpan,
    zhe1_verticalSpan,
    zhe2_horizontalSpan,
    zhe2_verticalSpan,
    wan_horizontalSpan,
    wan_verticalSpan,
    gou_horizontalSpan,
    gou_verticalSpan,
    skeletonRefPos,
  } = params
  const { weight } = global_params

  const _weight = weight * 1.5

  // 横
  let heng_start, heng_end
  const heng_start_ref = new FP.Joint(
    'heng_start_ref',
    {
      x: x0,
      y: y0 + heng_verticalSpan / 2 + _weight / 2,
    },
  )
  const heng_end_ref = new FP.Joint(
    'heng_end_ref',
    {
      x: heng_start_ref.x + heng_horizontalSpan,
      y: heng_start_ref.y - heng_verticalSpan - _weight / 2,
    },
  )
  if (skeletonRefPos === 1) {
    // 骨架参考位置为右侧（上侧）
    heng_start = new FP.Joint(
      'heng_start',
      {
        x: heng_start_ref.x,
        y: heng_start_ref.y + _weight / 2,
      },
    )
    heng_end = new FP.Joint(
      'heng_end',
      {
        x: heng_end_ref.x,
        y: heng_end_ref.y + _weight / 2,
      },
    )
  } else if (skeletonRefPos === 2) {
    // 骨架参考位置为左侧（下侧）
    heng_start = new FP.Joint(
      'heng_start',
      {
        x: heng_start_ref.x,
        y: heng_start_ref.y - _weight / 2,
      },
    )
    heng_end = new FP.Joint(
      'heng_end',
      {
        x: heng_end_ref.x,
        y: heng_end_ref.y - _weight / 2,
      },
    )
  } else {
    // 默认骨架参考位置，即骨架参考位置为中间实际绘制的骨架位置
    heng_start = new FP.Joint(
      'heng_start',
      {
        x: heng_start_ref.x,
        y: heng_start_ref.y,
      },
    )
    heng_end = new FP.Joint(
      'heng_end',
      {
        x: heng_end_ref.x,
        y: heng_end_ref.y,
      },
    )
  }
  glyph.addJoint(heng_start_ref)
  glyph.addJoint(heng_end_ref)
  glyph.addRefLine(refline(heng_start_ref, heng_end_ref, 'ref'))

  // 折1
  const zhe1_start = new FP.Joint(
    'zhe1_start',
    {
      x: heng_end.x,
      y: heng_end.y,
    },
  )
  const zhe1_end = new FP.Joint(
    'zhe1_end',
    {
      x: zhe1_start.x - zhe1_horizontalSpan,
      y: zhe1_start.y + zhe1_verticalSpan,
    },
  )

  // 折2
  const zhe2_start = new FP.Joint(
    'zhe2_start',
    {
      x: zhe1_start.x - zhe1_horizontalSpan,
      y: zhe1_start.y + zhe1_verticalSpan,
    },
  )
  const zhe2_end = new FP.Joint(
    'zhe2_end',
    {
      x: zhe2_start.x + zhe2_horizontalSpan,
      y: zhe2_start.y - zhe2_verticalSpan,
    },
  )

  // 弯
  const wan_start = new FP.Joint(
    'wan_start',
    {
      x: zhe2_end.x,
      y: zhe2_end.y,
    },
  )
  const wan_end = new FP.Joint(
    'wan_end',
    {
      x: wan_start.x - wan_horizontalSpan,
      y: wan_start.y + wan_verticalSpan,
    },
  )

  // 钩
  const gou_start = new FP.Joint(
    'gou_start',
    {
      x: wan_start.x - wan_horizontalSpan,
      y: wan_start.y + wan_verticalSpan,
    },
  )
  const gou_end = new FP.Joint(
    'gou_end',
    {
      x: gou_start.x - gou_horizontalSpan,
      y: gou_start.y + gou_verticalSpan,
    },
  )

  glyph.addJoint(heng_start)
  glyph.addJoint(heng_end)
  glyph.addJoint(zhe1_start)
  glyph.addJoint(zhe1_end)
  glyph.addJoint(zhe2_start)
  glyph.addJoint(zhe2_end)
  glyph.addJoint(wan_start)
  glyph.addJoint(wan_end)
  glyph.addJoint(gou_start)
  glyph.addJoint(gou_end)

  const skeleton = {
    heng_start,
    heng_end,
    zhe1_start,
    zhe1_end,
    zhe2_start,
    zhe2_end,
    wan_start,
    wan_end,
    gou_start,
    gou_end,
  }

  glyph.addRefLine(refline(heng_start, heng_end))
  glyph.addRefLine(refline(zhe1_start, zhe1_end))
  glyph.addRefLine(refline(zhe2_start, zhe2_end))
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
    heng_wave_momentum,
    zhe2_wave_momentum,
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
    zhe1_start,
    zhe1_end,
    zhe2_start,
    zhe2_end,
    wan_start,
    wan_end,
    gou_start,
    gou_end,
  } = skeleton

  const radius = 15
  const turn_angle_1 = FP.degreeToRadius(10)
  const turn_angle_2 = FP.degreeToRadius(0)
  const _weight = weight * 1.5

  // out指右侧（外侧）轮廓线
  // in指左侧（内侧）轮廓线
  const { out_heng_start, out_heng_end, in_heng_start, in_heng_end } = FP.getLineContours('heng', { heng_start, heng_end }, _weight)
  const { out_zhe1_start, out_zhe1_end, in_zhe1_start, in_zhe1_end } = FP.getLineContours('zhe1', { zhe1_start, zhe1_end }, _weight)
  const { out_zhe2_start, out_zhe2_end, in_zhe2_start, in_zhe2_end } = FP.getLineContours('zhe2', { zhe2_start, zhe2_end }, _weight)
  const { out_wan_start, out_wan_end, in_wan_start, in_wan_end } = FP.getLineContours('wan', { wan_start, wan_end }, _weight)
  const { out_gou_start, out_gou_end, in_gou_start, in_gou_end } = FP.getLineContours('gou', { gou_start, gou_end }, _weight, {
    startWeight: _weight,
    endWeight: _weight * 0.25,
  })
  const { corner: in_corner_heng_zhe1 } = FP.getIntersection(
    { type: 'line', start: in_heng_start, end: in_heng_end },
    { type: 'line', start: in_zhe1_start, end: in_zhe1_end },
  )
  const { corner: out_corner_heng_zhe1 } = FP.getIntersection(
    { type: 'line', start: out_heng_start, end: out_heng_end },
    { type: 'line', start: out_zhe1_start, end: out_zhe1_end },
  )
  let { corner: in_corner_zhe1_zhe2 } = FP.getIntersection(
    { type: 'line', start: in_zhe1_start, end: in_zhe1_end },
    { type: 'line', start: in_zhe2_start, end: in_zhe2_end },
  )
  let { corner: out_corner_zhe1_zhe2 } = FP.getIntersection(
    { type: 'line', start: out_zhe1_start, end: out_zhe1_end },
    { type: 'line', start: out_zhe2_start, end: out_zhe2_end },
  )
  const { corner: in_corner_zhe2_wan } = FP.getIntersection(
    { type: 'line', start: in_zhe2_start, end: in_zhe2_end },
    { type: 'line', start: in_wan_start, end: in_wan_end },
  )
  const { corner: out_corner_zhe2_wan } = FP.getIntersection(
    { type: 'line', start: out_zhe2_start, end: out_zhe2_end },
    { type: 'line', start: out_wan_start, end: out_wan_end },
  )
  const { corner: in_corner_wan_gou } = FP.getIntersection(
    { type: 'line', start: in_wan_start, end: in_wan_end },
    { type: 'line', start: in_gou_start, end: in_gou_end },
  )
  const { corner: out_corner_wan_gou } = FP.getIntersection(
    { type: 'line', start: out_wan_start, end: out_wan_end },
    { type: 'line', start: out_gou_start, end: out_gou_end },
  )
  const { corner: out_corner_heng_zhe1_down } = FP.getIntersection(
    { type: 'line', start: out_zhe1_start, end: in_zhe1_end },
    { type: 'line', start: in_heng_start, end: in_heng_end }
  )
  const out_corner_heng_zhe1_up = {
    x: out_corner_heng_zhe1_down.x,
    y: out_corner_heng_zhe1_down.y - weight,
  }

  // 计算横折1拐角处内外圆角相关的点与数据
  let in_radius_heng_zhe1 = bending_degree > 1 ? 60 * (bending_degree - 1) : 0
  let out_radius_heng_zhe1 = bending_degree > 1 ? 80 * (bending_degree - 1) : 0
  // 如果in_radius超出横或折1长度，取横或折1的最小长度
  const in_radius_min_length_heng_zhe1 = Math.min(
    getDistance(in_corner_heng_zhe1, in_heng_start),
    getDistance(in_corner_heng_zhe1, in_zhe1_end),
  )
  const out_radius_min_length_heng_zhe1 = Math.min(
    getDistance(out_zhe1_end, out_heng_start),
    getDistance(out_zhe1_start, out_corner_zhe1_zhe2),
  )
  if (in_radius_heng_zhe1 >= in_radius_min_length_heng_zhe1) {
    in_radius_heng_zhe1 = in_radius_min_length_heng_zhe1
  }
  if (out_radius_heng_zhe1 >= out_radius_min_length_heng_zhe1) {
    out_radius_heng_zhe1 = out_radius_min_length_heng_zhe1
  }
  const in_radius_start_heng_zhe1 = FP.getPointOnLine(in_corner_heng_zhe1, in_heng_start, in_radius_heng_zhe1)
  // {
  //   x: in_corner_heng_zhe1.x - in_radius_heng_zhe1,
  //   y: in_corner_heng_zhe1.y,
  // }
  const in_radius_end_heng_zhe1 = getRadiusPoint({
    start: in_corner_heng_zhe1,
    end: in_corner_zhe1_zhe2,
    radius: in_radius_heng_zhe1,
  })
  const out_radius_start_heng_zhe1 = FP.getPointOnLine(out_corner_heng_zhe1, out_heng_start, out_radius_heng_zhe1)
  // {
  //   x: out_corner_heng_zhe1.x - out_radius_heng_zhe1,
  //   y: out_corner_heng_zhe1.y,
  // }
  const out_radius_end_heng_zhe1 = getRadiusPoint({
    start: out_corner_heng_zhe1,
    end: out_corner_zhe1_zhe2,
    radius: out_radius_heng_zhe1,
  })

  // 计算折2弯拐角处内外圆角相关的点与数据
  let in_radius_zhe2_wan = 60 * bending_degree
  let out_radius_zhe2_wan = 80 * bending_degree
  // 如果in_radius超出折2或弯长度，取折2或弯的最小长度
  const in_radius_min_length_zhe2_wan = Math.min(
    getDistance(in_corner_zhe2_wan, in_zhe2_start),
    getDistance(in_corner_zhe2_wan, in_corner_wan_gou),
  )
  const out_radius_min_length_zhe2_wan = Math.min(
    getDistance(out_zhe2_end, out_corner_zhe1_zhe2),
    getDistance(out_corner_zhe2_wan, out_wan_end),
  )
  if (in_radius_zhe2_wan >= in_radius_min_length_zhe2_wan) {
    in_radius_zhe2_wan = in_radius_min_length_zhe2_wan
  }
  if (out_radius_zhe2_wan >= out_radius_min_length_zhe2_wan) {
    out_radius_zhe2_wan = out_radius_min_length_zhe2_wan
  }
  const in_radius_start_zhe2_wan = FP.getPointOnLine(in_corner_zhe2_wan, in_zhe2_start, in_radius_zhe2_wan)
  const in_radius_end_zhe2_wan = getRadiusPoint({
    start: in_corner_zhe2_wan,
    end: in_corner_wan_gou,
    radius: in_radius_zhe2_wan,
  })
  const out_radius_start_zhe2_wan = FP.getPointOnLine(out_corner_zhe2_wan, out_zhe2_start, out_radius_zhe2_wan)
  const out_radius_end_zhe2_wan = getRadiusPoint({
    start: out_corner_zhe2_wan,
    end: out_corner_wan_gou,
    radius: out_radius_zhe2_wan,
  })

  // 计算弯钩拐角处内外圆角相关的点与数据
  let in_radius_wan_gou = 30 * bending_degree
  let out_radius_wan_gou = 30 * bending_degree
  // 如果in_radius超出弯或钩的长度，取弯或钩的最小长度
  const in_radius_min_length_wan_gou = Math.min(
    getDistance(in_corner_wan_gou, in_gou_end),
    getDistance(in_corner_wan_gou, in_radius_end_zhe2_wan),
  )
  const out_radius_min_length_wan_gou = Math.min(
    getDistance(gou_start, gou_end),
    getDistance(out_zhe2_end, out_radius_end_zhe2_wan),
  )
  if (in_radius_wan_gou >= in_radius_min_length_wan_gou) {
    in_radius_wan_gou = in_radius_min_length_wan_gou
  }
  if (out_radius_wan_gou >= out_radius_min_length_wan_gou) {
    out_radius_wan_gou = out_radius_min_length_wan_gou
  }
  const in_radius_start_wan_gou = getRadiusPoint({
    start: in_corner_wan_gou,
    end: in_corner_zhe2_wan,
    radius: in_radius_wan_gou,
  })
  const in_radius_end_wan_gou = getRadiusPoint({
    start: in_corner_wan_gou,
    end: in_gou_end,
    radius: in_radius_wan_gou,
  })
  const out_radius_start_wan_gou = getRadiusPoint({
    start: out_wan_end,
    end: out_radius_end_zhe2_wan,
    radius: Math.min(out_radius_wan_gou * 2, FP.distance(wan_start, wan_end) * 0.5),
  })
  const out_radius_end_wan_gou = getRadiusPoint({
    start: out_gou_start,
    end: out_gou_end,
    radius: Math.min(out_radius_wan_gou * 2, FP.distance(gou_start, gou_end) * 0.5),
  })

  const end_p0 = out_radius_start_wan_gou
  const end_p3 = out_radius_end_wan_gou
  const end_p1 = FP.getPointOnLine(out_radius_start_wan_gou, out_corner_wan_gou, FP.distance(out_radius_start_wan_gou, out_corner_wan_gou) * 0.5)
  const end_p2 = FP.getPointOnLine(out_radius_end_wan_gou, out_corner_wan_gou, FP.distance(out_radius_end_wan_gou, out_corner_wan_gou) * 0.5)
  const end_p4 = out_gou_end
  const end_p5 = in_gou_end
  const end_p4_radius_before = FP.getPointOnLine(end_p4, end_p3, radius)
  const end_p5_radius_after = FP.getPointOnLine(end_p5, in_corner_wan_gou, radius)

  let turn_data_heng_zhe1 = {}
  let turn_data_zhe2_wan = {}
  // 计算转角风格1（凸起，圆滑连接）所需要的数据
  {
    const turn_length = 20 * turn_style_value
    const { inner_angle, mid_angle, angle1, angle2 } = FP.getTurnAngles(out_heng_start, out_corner_heng_zhe1, out_zhe1_end)
    const inner_corner_length = _weight
    const corner_radius = (inner_corner_length / 2) / Math.sin(inner_angle / 2)
    const turn_control_1 = FP.getPointOnLine(out_corner_heng_zhe1, out_heng_start, corner_radius)
    const turn_start_1 = FP.getPointOnLine(turn_control_1, out_heng_start, corner_radius)
    const turn_end_1 = {
      x: turn_control_1.x + turn_length * Math.cos(mid_angle),
      y: turn_control_1.y - turn_length * Math.sin(mid_angle),
    }
    const turn_control_2 = getRadiusPoint({
      start: out_corner_heng_zhe1,
      end: out_zhe1_end,
      radius: corner_radius,
    })
    const turn_start_2 = getRadiusPoint({
      start: turn_control_2,
      end: out_zhe1_end,
      radius: corner_radius,
    })
    const turn_end_2 = {
      x: turn_control_2.x + turn_length * Math.cos(mid_angle),
      y: turn_control_2.y - turn_length * Math.sin(mid_angle),
    }
    turn_data_heng_zhe1 = {
      turn_start_1,
      turn_control_1,
      turn_end_1,
      turn_start_2,
      turn_control_2,
      turn_end_2,
    }
  }
  {
    const turn_length = 20 * turn_style_value
    const { inner_angle, mid_angle, angle1, angle2 } = FP.getTurnAngles(out_zhe2_start, out_corner_zhe2_wan, out_wan_end)
    const inner_corner_length = _weight
    const corner_radius = (inner_corner_length / 2) / Math.sin(inner_angle / 2)
    const turn_control_1 = FP.getPointOnLine(out_corner_zhe2_wan, out_zhe2_start, corner_radius)
    const turn_start_1 = FP.getPointOnLine(turn_control_1, out_zhe2_start, corner_radius)
    const turn_end_1 = {
      x: turn_control_1.x + turn_length * Math.cos(mid_angle),
      y: turn_control_1.y - turn_length * Math.sin(mid_angle),
    }
    const turn_control_2 = getRadiusPoint({
      start: out_corner_zhe2_wan,
      end: out_wan_end,
      radius: corner_radius,
    })
    const turn_start_2 = getRadiusPoint({
      start: turn_control_2,
      end: out_wan_end,
      radius: corner_radius,
    })
    const turn_end_2 = {
      x: turn_control_2.x + turn_length * Math.cos(mid_angle),
      y: turn_control_2.y - turn_length * Math.sin(mid_angle),
    }
    turn_data_zhe2_wan = {
      turn_start_1,
      turn_control_1,
      turn_end_1,
      turn_start_2,
      turn_control_2,
      turn_end_2,
    }
  }

  const leftAngle = FP.degreeToRadius(30)
  const start_length = Math.min(50, FP.distance(heng_start, heng_end) * 0.3)
  const end_length = 30
  const d = 3 + 3 * weights_variation_power
  const d_2 = _weight * heng_wave_momentum
  const d_3 = _weight * zhe2_wave_momentum
  const l_heng = FP.distance(heng_start, heng_end)
  const l_zhe1 = FP.distance(zhe1_start, zhe1_end)
  const l_zhe2 = FP.distance(zhe2_start, zhe2_end)
  const l_wan = FP.distance(wan_start, wan_end)
  const control_length_heng = Math.min((l_heng * 0.5 - start_length) * 0.8, 45)
  const control_length_zhe1 = Math.min(l_zhe1 * 0.1, 45)
  const control_length_zhe2 = Math.min(l_zhe2 * 0.3, 45)
  const control_length_wan = Math.min(l_wan * 0.3, 45)

  let out_turn_1_p2 = FP.turnLeft(out_heng_end, FP.getPointOnLine(out_heng_end, out_heng_start, l_heng * 0.5 - control_length_heng), d)
  let out_turn_1_p1 = FP.turnLeft(out_heng_end, FP.getPointOnLine(out_heng_end, out_heng_start, l_heng * 0.5), d)
  let out_turn_1_p0 = FP.turnLeft(out_heng_end, FP.getPointOnLine(out_heng_end, out_heng_start, l_heng * 0.5 + control_length_heng), d)
  let in_turn_1_p2 = FP.turnRight(in_heng_end, FP.getPointOnLine(in_heng_end, in_heng_start, l_heng * 0.5 - control_length_heng), d)
  let in_turn_1_p1 = FP.turnRight(in_heng_end, FP.getPointOnLine(in_heng_end, in_heng_start, l_heng * 0.5), d)
  let in_turn_1_p0 = FP.turnRight(in_heng_end, FP.getPointOnLine(in_heng_end, in_heng_start, l_heng * 0.5 + control_length_heng), d)
  if (FP.distance(heng_start, heng_end) >= 250) {
    out_turn_1_p2 = FP.turnLeft(out_turn_1_p0, out_turn_1_p2, d_2)
    out_turn_1_p1 = FP.turnLeft(out_turn_1_p0, out_turn_1_p1, d_2)
    out_turn_1_p0 = FP.turnRight(out_turn_1_p2, out_turn_1_p0, d_2)
    in_turn_1_p2 = FP.turnLeft(in_turn_1_p0, in_turn_1_p2, d_2)
    in_turn_1_p1 = FP.turnLeft(in_turn_1_p0, in_turn_1_p1, d_2)
    in_turn_1_p0 = FP.turnRight(in_turn_1_p2, in_turn_1_p0, d_2)
  }

  const out_turn_1_p3 = turn_data_heng_zhe1.turn_start_1
  const out_turn_1_p6 = turn_data_heng_zhe1.turn_control_2
  const turn_1_p4_vector = FP.turnAngleFromStart(turn_data_heng_zhe1.turn_control_1, turn_data_heng_zhe1.turn_end_1, turn_angle_1, 100)
  const turn_1_p5_vector = FP.turnAngleFromStart(out_turn_1_p6, turn_data_heng_zhe1.turn_end_2, -turn_angle_2, 100)
  const { corner: out_turn_1_p4 } = FP.getIntersection(
    { type: 'line', start: turn_data_heng_zhe1.turn_control_1, end: turn_1_p4_vector },
    { type: 'line', start: turn_data_heng_zhe1.turn_end_2, end: turn_data_heng_zhe1.turn_end_1 }
  )
  const { corner: out_turn_1_p5 } = FP.getIntersection(
    { type: 'line', start: out_turn_1_p6, end: turn_1_p5_vector },
    { type: 'line', start: turn_data_heng_zhe1.turn_end_2, end: turn_data_heng_zhe1.turn_end_1 }
  )
  const out_turn_1_p9 = FP.turnLeft(out_zhe1_end, FP.getPointOnLine(out_zhe1_end, out_zhe1_start, l_zhe1 * 0.5 - control_length_zhe1), d)
  const out_turn_1_p8 = FP.turnLeft(out_zhe1_end, FP.getPointOnLine(out_zhe1_end, out_zhe1_start, l_zhe1 * 0.5), d)
  const out_turn_1_p7 = FP.turnLeft(out_zhe1_end, FP.getPointOnLine(out_zhe1_end, out_zhe1_start, l_zhe1 * 0.5 + control_length_zhe1), d)
  const in_turn_1_p6 = FP.turnRight(in_zhe1_end, FP.getPointOnLine(in_zhe1_end, in_zhe1_start, l_zhe1 * 0.5 - control_length_zhe1), d)
  const in_turn_1_p5 = FP.turnRight(in_zhe1_end, FP.getPointOnLine(in_zhe1_end, in_zhe1_start, l_zhe1 * 0.5), d)
  const in_turn_1_p4 = FP.turnRight(in_zhe1_end, FP.getPointOnLine(in_zhe1_end, in_zhe1_start, l_zhe1 * 0.5 + control_length_zhe1), d)
  
  const in_turn_1_p3 = in_corner_heng_zhe1

  const out_turn_1_p4_radius_before = FP.getPointOnLine(out_turn_1_p4, out_turn_1_p3, FP.distance(out_turn_1_p4, out_turn_1_p3) * 0.7)
  const out_turn_1_p4_radius_after = FP.getPointOnLine(out_turn_1_p4, out_turn_1_p5, FP.distance(out_turn_1_p4, out_turn_1_p5) * 0.4)
  const out_turn_1_p5_radius_before = FP.getPointOnLine(out_turn_1_p5, out_turn_1_p4, FP.distance(out_turn_1_p5, out_turn_1_p4) * 0.4)
  const out_turn_1_p5_radius_after = FP.getPointOnLine(out_turn_1_p5, out_turn_1_p6, FP.distance(out_turn_1_p5, out_turn_1_p6) * 0.7)
  const in_turn_1_p3_radius_before = FP.getPointOnLine(in_turn_1_p3, in_turn_1_p2, radius)
  const in_turn_1_p3_radius_after = FP.getPointOnLine(in_turn_1_p3, in_turn_1_p4, radius)

  let out_turn_2_p2 = FP.turnLeft(out_zhe2_end, FP.getPointOnLine(out_zhe2_end, out_zhe2_start, l_zhe2 * 0.5 - control_length_zhe2), d)
  let out_turn_2_p1 = FP.turnLeft(out_zhe2_end, FP.getPointOnLine(out_zhe2_end, out_zhe2_start, l_zhe2 * 0.5), d)
  let out_turn_2_p0 = FP.turnLeft(out_zhe2_end, FP.getPointOnLine(out_zhe2_end, out_zhe2_start, l_zhe2 * 0.5 + control_length_zhe2), d)
  let in_turn_2_p2 = FP.turnRight(in_zhe2_end, FP.getPointOnLine(in_zhe2_end, in_zhe2_start, l_zhe2 * 0.5 - control_length_zhe2), d)
  let in_turn_2_p1 = FP.turnRight(in_zhe2_end, FP.getPointOnLine(in_zhe2_end, in_zhe2_start, l_zhe2 * 0.5), d)
  let in_turn_2_p0 = FP.turnRight(in_zhe2_end, FP.getPointOnLine(in_zhe2_end, in_zhe2_start, l_zhe2 * 0.5 + control_length_zhe2), d)
  if (FP.distance(zhe2_start, zhe2_end) >= 250) {
    out_turn_2_p2 = FP.turnLeft(out_turn_2_p0, out_turn_2_p2, d_3)
    out_turn_2_p1 = FP.turnLeft(out_turn_2_p0, out_turn_2_p1, d_3)
    out_turn_2_p0 = FP.turnRight(out_turn_2_p2, out_turn_2_p0, d_3)
    in_turn_2_p2 = FP.turnLeft(in_turn_2_p0, in_turn_2_p2, d_3)
    in_turn_2_p1 = FP.turnLeft(in_turn_2_p0, in_turn_2_p1, d_3)
    in_turn_2_p0 = FP.turnRight(in_turn_2_p2, in_turn_2_p0, d_3)
  }
  const out_turn_2_p3 = turn_data_zhe2_wan.turn_start_1
  const out_turn_2_p6 = turn_data_zhe2_wan.turn_control_2
  const turn_2_p4_vector = FP.turnAngleFromStart(turn_data_zhe2_wan.turn_control_1, turn_data_zhe2_wan.turn_end_1, turn_angle_1, 100)
  const turn_2_p5_vector = FP.turnAngleFromStart(out_turn_2_p6, turn_data_zhe2_wan.turn_end_2, -turn_angle_2, 100)
  const { corner: out_turn_2_p4 } = FP.getIntersection(
    { type: 'line', start: turn_data_zhe2_wan.turn_control_1, end: turn_2_p4_vector },
    { type: 'line', start: turn_data_zhe2_wan.turn_end_2, end: turn_data_zhe2_wan.turn_end_1 }
  )
  const { corner: out_turn_2_p5 } = FP.getIntersection(
    { type: 'line', start: out_turn_2_p6, end: turn_2_p5_vector },
    { type: 'line', start: turn_data_zhe2_wan.turn_end_2, end: turn_data_zhe2_wan.turn_end_1 }
  )
  const out_turn_2_p9 = FP.turnLeft(out_wan_end, FP.getPointOnLine(out_wan_end, out_wan_start, l_wan * 0.5 - control_length_wan), d)
  const out_turn_2_p8 = FP.turnLeft(out_wan_end, FP.getPointOnLine(out_wan_end, out_wan_start, l_wan * 0.5), d)
  const out_turn_2_p7 = FP.turnLeft(out_wan_end, FP.getPointOnLine(out_wan_end, out_wan_start, l_wan * 0.5 + control_length_wan), d)
  const in_turn_2_p6 = FP.turnRight(in_wan_end, FP.getPointOnLine(in_wan_end, in_wan_start, l_wan * 0.5 - control_length_wan), d)
  const in_turn_2_p5 = FP.turnRight(in_wan_end, FP.getPointOnLine(in_wan_end, in_wan_start, l_wan * 0.5), d)
  const in_turn_2_p4 = FP.turnRight(in_wan_end, FP.getPointOnLine(in_wan_end, in_wan_start, l_wan * 0.5 + control_length_wan), d)
  const in_turn_2_p3 = in_corner_zhe2_wan

  const out_turn_2_p4_radius_before = FP.getPointOnLine(out_turn_2_p4, out_turn_2_p3, FP.distance(out_turn_2_p4, out_turn_2_p3) * 0.7)
  const out_turn_2_p4_radius_after = FP.getPointOnLine(out_turn_2_p4, out_turn_2_p5, FP.distance(out_turn_2_p4, out_turn_2_p5) * 0.4)
  const out_turn_2_p5_radius_before = FP.getPointOnLine(out_turn_2_p5, out_turn_2_p4, FP.distance(out_turn_2_p5, out_turn_2_p4) * 0.4)
  const out_turn_2_p5_radius_after = FP.getPointOnLine(out_turn_2_p5, out_turn_2_p6, FP.distance(out_turn_2_p5, out_turn_2_p6) * 0.7)
  const in_turn_2_p3_radius_before = FP.getPointOnLine(in_turn_2_p3, in_turn_2_p2, radius)
  const in_turn_2_p3_radius_after = FP.getPointOnLine(in_turn_2_p3, in_turn_2_p4, radius)

  in_corner_zhe1_zhe2 = FP.getIntersection(
    { type: 'line', start: in_turn_1_p6, end: in_turn_1_p5 },
    { type: 'line', start: in_turn_2_p1, end: in_turn_2_p2 },
  ).corner
  out_corner_zhe1_zhe2 = FP.getIntersection(
    { type: 'line', start: out_turn_1_p9, end: out_turn_1_p8 },
    { type: 'line', start: out_turn_2_p2, end: out_turn_2_p1 },
  ).corner

  const start_p4 = heng_start
  const start_p5 = FP.turnAngleFromEnd(heng_end, heng_start, FP.degreeToRadius(90) - leftAngle, _weight * 0.6)
  const start_p3 = FP.turnAngleFromEnd(heng_end, heng_start, -(FP.degreeToRadius(90) + leftAngle), _weight * 0.75)
  const start_p6 = FP.turnLeft(start_p4, start_p5, _weight * 0.5)
  const start_p7 = FP.turnLeft(start_p4, start_p5, _weight)
  const start_p7_p9_vector = FP.turnLeft(start_p5, start_p7, 100)
  const { corner: start_p9 } = FP.getIntersection(
    { type: 'line', start: start_p7, end: start_p7_p9_vector },
    { type: 'line', start: in_heng_start, end: in_heng_end }
  )
  const start_p8 = FP.getPointOnLine(start_p7, start_p9, FP.distance(start_p7, start_p9) * 0.5)
  const start_p10 = FP.getPointOnLine(start_p9, in_turn_1_p0, FP.distance(start_p9, in_turn_1_p0) * 0.5)
  const start_p1 = FP.turnRight(start_p4, start_p3, _weight * 0.5)
  const start_p2 = FP.getPointOnLine(start_p3, start_p1, FP.distance(start_p3, start_p1) * 0.5)
  const start_p0 = FP.getPointOnLine(start_p1, out_turn_1_p0, FP.distance(start_p1, out_turn_1_p0) * 0.5)

  const in_corner_zhe1_zhe2_radius_before = FP.getPointOnLine(in_corner_zhe1_zhe2, in_turn_1_p6, radius * 2)
  const in_corner_zhe1_zhe2_radius_after = FP.getPointOnLine(in_corner_zhe1_zhe2, in_turn_2_p0, radius * 2)
  const out_corner_zhe1_zhe2_radius_before = FP.getPointOnLine(out_corner_zhe1_zhe2, out_turn_1_p9, radius * 2)
  const out_corner_zhe1_zhe2_radius_after = FP.getPointOnLine(out_corner_zhe1_zhe2, out_turn_2_p0, radius * 2)

  // 创建钢笔组件
  const pen = new FP.PenComponent()
  pen.beginPath()

  // 按逆时针方向绘制轮廓
  pen.moveTo(start_p0.x, start_p0.y)
  pen.quadraticBezierTo(start_p1.x, start_p1.y, start_p2.x, start_p2.y)
  pen.quadraticBezierTo(start_p3.x, start_p3.y, start_p4.x, start_p4.y)
  pen.quadraticBezierTo(start_p5.x, start_p5.y, start_p6.x, start_p6.y)
  pen.quadraticBezierTo(start_p7.x, start_p7.y, start_p8.x, start_p8.y)
  pen.quadraticBezierTo(start_p9.x, start_p9.y, start_p10.x, start_p10.y)

  pen.quadraticBezierTo(in_turn_1_p0.x, in_turn_1_p0.y, in_turn_1_p1.x, in_turn_1_p1.y)
  pen.quadraticBezierTo(in_turn_1_p2.x, in_turn_1_p2.y, in_turn_1_p3_radius_before.x, in_turn_1_p3_radius_before.y)
  pen.quadraticBezierTo(in_turn_1_p3.x, in_turn_1_p3.y, in_turn_1_p3_radius_after.x, in_turn_1_p3_radius_after.y)
  pen.quadraticBezierTo(in_turn_1_p4.x, in_turn_1_p4.y, in_turn_1_p5.x, in_turn_1_p5.y)
  pen.quadraticBezierTo(in_turn_1_p6.x, in_turn_1_p6.y, in_corner_zhe1_zhe2_radius_before.x, in_corner_zhe1_zhe2_radius_before.y)

  pen.quadraticBezierTo(in_corner_zhe1_zhe2.x, in_corner_zhe1_zhe2.y, in_corner_zhe1_zhe2_radius_after.x, in_corner_zhe1_zhe2_radius_after.y)

  pen.quadraticBezierTo(in_turn_2_p0.x, in_turn_2_p0.y, in_turn_2_p1.x, in_turn_2_p1.y)
  pen.quadraticBezierTo(in_turn_2_p2.x, in_turn_2_p2.y, in_turn_2_p3_radius_before.x, in_turn_2_p3_radius_before.y)
  pen.quadraticBezierTo(in_turn_2_p3.x, in_turn_2_p3.y, in_turn_2_p3_radius_after.x, in_turn_2_p3_radius_after.y)
  pen.quadraticBezierTo(in_turn_2_p4.x, in_turn_2_p4.y, in_turn_2_p5.x, in_turn_2_p5.y)
  pen.quadraticBezierTo(in_turn_2_p6.x, in_turn_2_p6.y, in_radius_start_wan_gou.x, in_radius_start_wan_gou.y)

  pen.quadraticBezierTo(in_corner_wan_gou.x, in_corner_wan_gou.y, in_radius_end_wan_gou.x, in_radius_end_wan_gou.y)
  pen.lineTo(end_p5_radius_after.x, end_p5_radius_after.y)
  pen.bezierTo(end_p5.x, end_p5.y, end_p4.x, end_p4.y, end_p4_radius_before.x, end_p4_radius_before.y)
  pen.lineTo(end_p3.x, end_p3.y)
  pen.bezierTo(end_p2.x, end_p2.y, end_p1.x, end_p1.y, end_p0.x, end_p0.y)

  pen.quadraticBezierTo(out_turn_2_p9.x, out_turn_2_p9.y, out_turn_2_p8.x, out_turn_2_p8.y)
  pen.bezierTo(out_turn_2_p7.x, out_turn_2_p7.y, out_turn_2_p6.x, out_turn_2_p6.y, out_turn_2_p5_radius_after.x, out_turn_2_p5_radius_after.y)
  pen.quadraticBezierTo(out_turn_2_p5.x, out_turn_2_p5.y, out_turn_2_p5_radius_before.x, out_turn_2_p5_radius_before.y)
  pen.lineTo(out_turn_2_p4_radius_after.x, out_turn_2_p4_radius_after.y)
  pen.quadraticBezierTo(out_turn_2_p4.x, out_turn_2_p4.y, out_turn_2_p4_radius_before.x, out_turn_2_p4_radius_before.y)
  pen.bezierTo(out_turn_2_p3.x, out_turn_2_p3.y, out_turn_2_p2.x, out_turn_2_p2.y, out_turn_2_p1.x, out_turn_2_p1.y)
  pen.quadraticBezierTo(out_turn_2_p0.x, out_turn_2_p0.y, out_corner_zhe1_zhe2_radius_after.x, out_corner_zhe1_zhe2_radius_after.y)
  pen.quadraticBezierTo(out_corner_zhe1_zhe2.x, out_corner_zhe1_zhe2.y, out_corner_zhe1_zhe2_radius_before.x, out_corner_zhe1_zhe2_radius_before.y)

  pen.quadraticBezierTo(out_turn_1_p9.x, out_turn_1_p9.y, out_turn_1_p8.x, out_turn_1_p8.y)
  pen.bezierTo(out_turn_1_p7.x, out_turn_1_p7.y, out_turn_1_p6.x, out_turn_1_p6.y, out_turn_1_p5_radius_after.x, out_turn_1_p5_radius_after.y)
  pen.quadraticBezierTo(out_turn_1_p5.x, out_turn_1_p5.y, out_turn_1_p5_radius_before.x, out_turn_1_p5_radius_before.y)
  pen.lineTo(out_turn_1_p4_radius_after.x, out_turn_1_p4_radius_after.y)
  pen.quadraticBezierTo(out_turn_1_p4.x, out_turn_1_p4.y, out_turn_1_p4_radius_before.x, out_turn_1_p4_radius_before.y)
  pen.bezierTo(out_turn_1_p3.x, out_turn_1_p3.y, out_turn_1_p2.x, out_turn_1_p2.y, out_turn_1_p1.x, out_turn_1_p1.y)
  pen.quadraticBezierTo(out_turn_1_p0.x, out_turn_1_p0.y, start_p0.x, start_p0.y)

  pen.closePath()
  return [ pen ]
}

updateGlyphByParams(params, global_params)