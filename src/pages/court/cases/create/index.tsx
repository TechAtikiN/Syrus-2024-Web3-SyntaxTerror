import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';
import { useAddress, useContract, useMintNFT } from '@thirdweb-dev/react'
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

type FormData = {
  plaintiffName: string
  plaintiffEmail: string
  plaintiffContact: string
  plaintiffAddress: string
  plaintiffLawyerName: string
  plaintiffLawyerEmail: string
  plaint: FileList
  defendantName: string
  defendantEmail: string
  defendantContact: string
  defendantAddress: string
  defendantLawyerName: string
  defendantLawyerEmail: string
  summon: FileList
  defendantClaim: FileList
  additionalDocuments: FileList
  caseDescription: string
}

const CreateCasePage = () => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const address = useAddress()
  const { contract: caseCollection } = useContract(process.env.NEXT_PUBLIC_CASES_CONTRACT_ADDRESS)
  const { mutateAsync: mintNft, isSuccess, data: NFTReturnValue } = useMintNFT(caseCollection)

  function generateRandomId() {
    return uuidv4(); // Generate a random UUID (Universally Unique Identifier)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)
    const caseId = generateRandomId()

    const caseMetaData = {
      name: `Case for ${data.plaintiffName} vs ${data.defendantName}`,
      description: 'Creating new case',
      properties: {
        plaintiff: {
          name: data.plaintiffName,
          email: data.plaintiffEmail,
          contact: data.plaintiffContact,
          address: data.plaintiffAddress,
          plaint: data.plaint,
          lawyerName: data.plaintiffLawyerName,
          lawyerEmail: data.plaintiffLawyerEmail
        },
        defendant: {
          name: data.defendantName,
          email: data.defendantEmail,
          contact: data.defendantContact,
          address: data.defendantAddress,
          summon: data.summon,
          claim: data.defendantClaim,
          lawyerName: data.defendantLawyerName,
          lawyerEmail: data.defendantLawyerEmail
        },
        additionalDocuments: data.additionalDocuments,
        caseDescription: data.caseDescription,
        status: 'New',
        caseId: caseId,
        caseCreatedAt: new Date().toISOString()
      },
    }
    console.log('firMetadata', caseMetaData)

    try {
      if (loading) {
        toast({
          title: "Submitting...",
          description: "Please wait while we submit your case",
        })
      }
      await mintNft({
        to: address || '',
        metadata: caseMetaData
      })
      setLoading(false)
      toast({
        title: "Case Created",
        description: "Your case has been created successfully",
      })
      // if (isSuccess) {
      //   const res = await fetch('/api/mailing', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       ...data,
      //       // @ts-ignore
      //       tokenId: NFTReturnValue?.id?._hex.toString(),
      //       firId: caseId,
      //       status: 'New'
      //     })
      //   })
      //   console.log('res', res)
      //   if (res.status === 200) {
      //     toast({
      //       title: "Scheduled: Catch up",
      //       description: "Friday, February 10, 2023 at 5:57 PM",
      //     })
      //   }
      // }
    } catch (error) {
      alert('Error minting FIR')
      console.log('error', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='p-3 m-4 rounded-md' action=''>
        <div className='border-b border-slate-300'>
          <h2 className='text-2xl font-semibold'>Create a Case</h2>
          <p className='font-light pb-2  text-xs'>Please fill the required case details</p>
        </div>

        <div className='py-3 font-semibold text-xl'>
          <h3 className='my-1'>Plaintiff Details</h3>
          <div className='grid grid-cols-3 gap-x-10 gap-y-5'>
            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='plaintiffName'>Name:</label>
              <input
                {...register('plaintiffName', { required: true })}
                className='form-input' type='text' />
              {errors.plaintiffName && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='plaintiffEmail'>Email:</label>
              <input
                {...register('plaintiffEmail', { required: true })}
                className='form-input' type='text' />
              {errors.plaintiffEmail && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='plaintiffContact'>Contact:</label>
              <input
                {...register('plaintiffContact', { required: true })}
                className='form-input' type='text' />
              {errors.plaintiffContact && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='plaintiffAddress'>Address:</label>
              <input
                {...register('plaintiffAddress', { required: true })}
                className='form-input' type='text' />
              {errors.plaintiffAddress && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='plaintiffLawyerName'>Lawyer Name:</label>
              <input
                {...register('plaintiffLawyerName', { required: true })}
                className='form-input' type='text' />
              {errors.plaintiffLawyerName && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='plaintiffLawyerEmail'>Lawyer Email:</label>
              <input
                {...register('plaintiffLawyerEmail', { required: true })}
                className='form-input' type='text' />
              {errors.plaintiffLawyerEmail && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='plaint'>Plaint</label>
              <input
                {...register('plaint', { required: true })}
                className='form-input' type='file' />
              {errors.plaint && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>
          </div>
        </div>

        <div className='py-3 font-semibold text-xl'>
          <h3 className='my-1'>Defendant Details</h3>
          <div className='grid grid-cols-3 gap-x-10 gap-y-5'>
            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='defdendantName'>Name:</label>
              <input
                {...register('defendantName', { required: true })}
                className='form-input' type='text' />
              {errors.defendantName && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='defdendantEmail'>Email:</label>
              <input
                {...register('defendantEmail', { required: true })}
                className='form-input' type='text' />
              {errors.defendantEmail && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='defdendantContact'>Contact:</label>
              <input
                {...register('defendantContact', { required: true })}
                className='form-input' type='text' />
              {errors.defendantContact && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='defdendantAddress'>Address:</label>
              <input
                {...register('defendantAddress', { required: true })}
                className='form-input' type='text' />
              {errors.defendantAddress && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='defendantLawyerName'>Lawyer Name:</label>
              <input
                {...register('defendantLawyerName', { required: true })}
                className='form-input' type='text' />
              {errors.defendantLawyerName && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='defendantLawyerEmail'>Lawyer Email:</label>
              <input
                {...register('defendantLawyerEmail', { required: true })}
                className='form-input' type='text' />
              {errors.defendantLawyerEmail && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='summon'>Summon</label>
              <input
                {...register('summon', { required: true })}
                className='form-input' type='file' />
              {errors.summon && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='defendantClaim'>Claim</label>
              <input
                {...register('defendantClaim', { required: true })}
                className='form-input' type='file' />
              {errors.defendantClaim && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>
          </div>
        </div>

        <div className='py-3 font-semibold text-xl'>
          <h3 className='my-1'>Case Description</h3>
          <div className='w-full col-span-3'>
            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='caseDescription'>Description about the case</label>
              <textarea
                rows={4}
                {...register('caseDescription', { required: true })}
                className='form-input'
              >
              </textarea>
              {errors.caseDescription && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>
          </div>
        </div>

        <div className='py-3 font-semibold text-xl'>
          <h3 className='my-1'>Additional Documents</h3>
          <div className='grid grid-cols-3 gap-x-10 gap-y-5'>

            <div className='flex flex-col space-y-1'>
              <label className='form-label' htmlFor='additionalDocuments'>Add documents relevant to the case</label>
              <input
                {...register('additionalDocuments', { required: true })}
                className='form-input' type='file' />
              {errors.additionalDocuments && <span className='text-red-500 text-sm'>This field is required</span>}
            </div>
          </div>
        </div>
        <Button type='submit' className='mt-5 rounded-sm' variant='default'>Add Case</Button>
      </form>
    </div >
  )
}

export default CreateCasePage