import * as React from 'react'
import styled from 'styled-components'

const Container = styled.table`
  width: 100%;
`

type State = { active: boolean }
class WeeklyView extends React.component<{}> {
  render () {
    return <Container />
  }
}

export default WeeklyView

//
// %table.schedule
//   %thead
//     - ["", "Monday", "Tuesday", "Wednesday", "Thursday",
//       "Friday", "Saturday", "Sunday"].each do |day|
//       %td=day
//   %tbody
//     - semester.schedule.rows.each do |row|
//       %tr
//         %th= row.start_time
//         - row.weekdays.each do |cell|
//           - unless cell.nil?
//             %td{ class: cell.css_class,
//                  data: cell.data_attributes,
//                  rowspan: cell.rowspan }
//               - unless cell.show.nil?
//                 - if current_page? edit_semester_path(semester)
//                   .show_delete
//                     - message = 'Are you sure you want to delete this show?'
//                     = link_to '[x]', cell.show,
//                               method: :delete,
//                               data: { confirm: message}
//                 = render cell.show, locals: locals
