/*
==================================================
Change ID: M07-003
Date: 2026-06-04
Status: Active

Purpose:
Employee Leave Application Page

Risk:
Low

Rollback:
Delete file
==================================================
*/

import DashboardLayout
from "../../../components/layout/DashboardLayout";

import LeaveForm
from "../components/LeaveForm";

function LeavePage() {

  return (

    <DashboardLayout>

      <LeaveForm />

    </DashboardLayout>

  );

}

export default LeavePage;