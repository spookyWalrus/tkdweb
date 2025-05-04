import { useTranslations } from "next-intl";
import SessionStart from "../../../components/courseFeeFunctions";

export default function CourseFees() {
  // const t = useTranslations("CourseFees");
  return (
    <div className="main">
      <div className="mainMargin">
        <div>
          <h3>Course schedule</h3>
          <p>3 sessions per school year (Fall, Winter, Spring).</p>
          <p>Length of 1 session: 12 weeks, minimum of 24 classes.</p>
          <p>3 classes per week, 1 hour class.</p>
          <SessionStart />
          <br />
          <p>
            On days of extreme weather, class may be cancelled.
            <br />
            Please consult the <a>current news / events </a> page for up-to-date
            information.
          </p>
        </div>
        <div className="bodyTextMarginTop">
          <table className="table is-striped">
            <thead className="thead">
              <tr>
                <th></th>
                <th className="tableHead">Tuesday</th>
                <th className="tableHead">Thursday</th>
                <th className="tableHead">Saturday</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  Beginners
                  <br /> Kids 12yr- and/or adults
                </th>
                <td>
                  Start: 18:30 <br />
                </td>
                <td>
                  Start: 18:30 <br />
                </td>
                <td>Start: 13h</td>
              </tr>
              <tr>
                <th>
                  Advanced
                  <br /> 12yr+ and/or adults
                </th>
                <td>
                  Start: 18:30 <br />
                </td>
                <td>
                  Start: 18:30 <br />
                </td>
                <td>Start: 13h</td>
              </tr>
              <tr>
                <th>Black belt or color belts</th>
                <td>
                  Start: 19:45 <br />
                </td>
                <td>
                  Start: 19:45 <br />
                </td>
                <td>Start: 13h</td>
              </tr>
            </tbody>
          </table>
          <p>
            Advanced belts or adults can attend classes at 18:30 and 19:45 in
            succession.
          </p>
          <p>Attendance of Saturday classes flexible.</p>
          <p className="underline">Saturdays count as two classes.</p>
        </div>
        <div className="bodyTextMarginTop">
          <h3>Course fees</h3>
          <table className="table is-striped">
            <thead className="thead">
              <tr>
                <th></th>
                <th>Cost per session / per person</th>
                <th>
                  Family rate per session <br />
                  (3 ppl or more)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  Recreational <br />
                  (beginners 4yrs+, parents w/Kids)
                </th>
                <td>85$</td>
                <td>Family price$</td>
              </tr>
              <tr>
                <th>
                  Competitive <br />
                  (children 4yrs+, parents w/Kids)
                </th>
                <td>100$ </td>
                <td>Family price$</td>
              </tr>
              <tr>
                <th>
                  Advanced <br />
                  (children 12yrs+, adults or any advanced level)
                </th>
                <td>100$ </td>
                <td>Family price$</td>
              </tr>
              <tr>
                <th>
                  Advanced <br />
                  (black belt or Poom)
                </th>
                <td>120$ </td>
                <td>Family price$</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="bodyTextMarginTop">Additional costs</h3>
          <div>
            <h4 className="underline">Equipment</h4>
            <p>Basic uniform (Dobuk):40$</p>
            <p>
              Sparring equipment (competitive level) (Head gear, body
              protection, arm and leg protection): 100$
            </p>
            <br />
            <p>
              Purchase of uniform or equipment to be arranged in person with
              instructors after registration.
            </p>
          </div>
        </div>
        <div className="bodyTextMarginTop">
          <h4 className="underline">Fees</h4>
          <p>
            Quebec TKD association fee per person / year (color belts) : 40$
          </p>
          <p>Quebec TKD association fee per person /year (black belts) : 40$</p>
        </div>
        <div className="bodyTextMarginTop">
          <h4 className="underline">Exams</h4>
          <p>
            Costs of exams vary between what level a student is moving up to.
          </p>
          <p>Exam fees due on weeks leading up to or day of exam.</p>
          <p>Cost of exam for color belts: 30$</p>
          <p> Cost of exam for black belt: 50$</p>
          <br />
          <p>
            Exam advancement based on attendance and progression of development
            evaluated by instructors.
          </p>
        </div>
        <div className="bodyTextMarginTop">
          <p>Try out courses offered, please make inquiries.</p>
          <p>Registration can be done in person.</p>
          <div>
            <p>Payments possible with cash, cheque or e-transfer.</p>
            <br />
            <p>
              <bold>E-transfer payments made to:</bold>
            </p>
            <p>ccstkdrawdon@gmail.com</p>
            <p>Question: Paiement</p>
            <p>Response: tkd</p>
            <p>Please leave a comment and specify what the payment is for.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
