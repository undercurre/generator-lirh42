module.exports = {
  // 跨端模板
  PolyWeb: {
    // 分支->平台
    description: '一套集APP、Web、桌面、小程序于一体的开发模板',
    children: [
      {
        key: 'H5',
        branch: 'main',
        description: 'H5模板',
      },
      {
        key: 'PC',
        branch: 'electron',
        description: '桌面应用模板',
      },
      {
        key: 'Hybrid',
        branch: 'uni(app/mini)',
        description: '混合H5/APP/PC桌面应用/小程序开发模板',
      },
    ],
  },
}
