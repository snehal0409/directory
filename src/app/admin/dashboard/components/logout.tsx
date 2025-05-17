
'use client'

import { logoutAdmin } from '../actions/logout'
import React from 'react'

export default function LogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button
        type="submit"
       className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      > Logout
      </button>
    </form>
  )
}
