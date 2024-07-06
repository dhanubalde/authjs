import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import RoleGate from '../auth/role-gate'
import { UserRole } from '@prisma/client'
import FormSuccess from '../form-success'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'
import { admin } from '@/actions/admin'

const Admin = () => {

  const onServerActionClick = () => { 
    admin()
      .then((data)=> { 
        if (data.error) {
          toast({
            description: `${data.error}`
          })
        }

        if (data.success) { 
          toast({
            title: "Successfully Forcontrol Admin",
            description: `${data.success}`

          })
        }
      })
  }


  const onApiRouteClick = async () => { 
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      toast({
        description: `${data.error}`
      })
    }

    if (data.success) { 
      toast({
        title: "Successfully Forcontrol Admin",
        description: `${data.success}`

      })
    }
  }



  return (
    <div className='mt-4'>

    <Card className=" w-[600px]">
        <CardHeader>
          <p className=" text-2xl font-semibold text-center">
            Admin
          </p>
        </CardHeader>
        <CardContent className=" space-y-4">
          <RoleGate
            allowedRole={UserRole.ADMIN}
          >
            <FormSuccess message="You are allowed to see this content"/>
          </RoleGate>
          <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className=" text-sm font-medium">
              Admin-only API Route
            </p>
            {/* <Button onClick={() => { 
              
            }}>
              Click to test
            </Button> */}
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only Server Action
          </p>
          {/* <Button onClick={onServerActionClick}>
            Click to test
          </Button> */}
        </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Admin