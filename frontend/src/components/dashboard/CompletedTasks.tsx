import React from 'react'
import Tasks from '../ui/Tasks';

const CompletedTasks = () => {
  return (
    <div>
      <Tasks taskTitleName='Here are all your completed task tasks'  type='all/completed'/>
    </div>
  )
}

export default CompletedTasks;