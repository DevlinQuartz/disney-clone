import React from 'react'
import { useParams } from 'react-router-dom'
import ServantDesc from './ServantDesc'

function Servant() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h2 className="text-2xl text-white font-bold mb-6">Servant Profile</h2>
      <ServantDesc selectedServantId={parseInt(id)} />
    </div>
  )
}

export default Servant
