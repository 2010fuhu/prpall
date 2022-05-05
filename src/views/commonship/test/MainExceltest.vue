<template>
  <button @click="tableToExcel">导出</button>
</template>
  
  <script>
export default {
  data() {
    return {
      jsonData: [
        {
          name: "路人甲",
          phone: "123456",
          email: "123@123456.com"
        },
        {
          name: "炮灰乙",
          phone: "123456",
          email: "123@123456.com"
        },
        {
          name: "土匪丙",
          phone: "123456",
          email: "123@123456.com"
        },
        {
          name: "流氓丁",
          phone: "123456",
          email: "123@123456.com"
        }
      ]
    };
  },
  methods: {
    tableToExcel() {
      //要导出的json数据

      //列标题
      let str = "<tr><td>姓名</td><td>电话</td><td>邮箱</td></tr>";
      //循环遍历，每行加入tr标签，每个单元格加td标签
      for (let i = 0; i < this.jsonData.length; i++) {
        str += "<tr>";
        for (let item in  this.jsonData[i]) {
          //增加\t为了不让表格显示科学计数法或者其他格式
          str += `<td>${ this.jsonData[i][item] + "\t"}</td>`;
        }
        str += "</tr>";
      }
      //Worksheet名
      //let worksheet = "Sheet1";
      let uri = "data:application/vnd.ms-excel;base64,";

      //下载的表格模板数据
      let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:x="urn:schemas-microsoft-com:office:excel" 
      xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        </head><body><table>${str}</table></body></html>`;
      //下载模板
      console.log(template+uri)
      window.location.href = uri + this.base64(template);
    },
    //输出base64编码
     base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) }
  }
};
</script>
