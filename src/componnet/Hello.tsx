import React from 'react'

//定义一个接口  你可以理解为是类型检查器 
//声明接口还有个type 功能都差不多的  我个人比较常用interface
export interface HelloProps {
    compiler: string;
    framework: string
}


// export class Hello extends React.Component<HelloProps,{}>{
//    render(){
//       return <h1>Hello from {this.props.compiler} and {this.props.framework}</h1>
//    }
// }

//定义基本的类型 你想是什么类型就是什么类型
let list :string[] = ['a' ,'b','c']
console.log('list',list)


//React.FC   ts中的函数的写法 fc是 functionComponent   <>是泛型
export const Hello:React.FC<HelloProps> = (props)=>{
   const {compiler,framework} = props
  return (
     <h1>Hello from {compiler} and {framework}</h1>
  )
}

