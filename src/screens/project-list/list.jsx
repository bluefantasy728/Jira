import React from 'react'

const List = ({list,users}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
            {/* ?前面的是undefine则整个语句是undefined就不会报undefined.name的错了 */}
              <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default List