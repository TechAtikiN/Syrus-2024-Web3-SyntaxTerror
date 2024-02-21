import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAddress, useContract, useNFT, useSDK } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type FormValues = {
  description: string
  documents: FileList
  status: string
}

export default function UpdateCase({ caseDetails, token }: { caseDetails: any, token: string }) {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  const address = useAddress()

  const sdk = useSDK()

  const { contract: FIRCollection } = useContract(process.env.NEXT_PUBLIC_CASES_CONTRACT_ADDRESS)

  const { data: nft, isLoading: isNFTLoading } = useNFT(
    FIRCollection,
    token?.toString()
  )

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.status === 'In Progress') {
        const inProgressCaseMetadata = {
          name: `Update for ${caseDetails?.plaintiff?.name} vs ${caseDetails?.defendant?.name}`,
          description: 'Updating Case',
          properties: {
            // @ts-ignore
            ...nft?.metadata?.properties,
            status: data.status,
            description: {
              //@ts-ignore
              new: nft?.metadata?.properties?.caseDescription,
              inProgress: data.description,
            },
            documents: {
              //@ts-ignore
              new: nft?.metadata?.properties?.additionalDocuments,
              inProgress: data.documents,
            }
          }
        }
        console.log('inProgressCaseMetadata', inProgressCaseMetadata)
        const newInProgressURI = await sdk!.storage.upload(inProgressCaseMetadata)

        const updateNFT = await FIRCollection!.call("setTokenURI", [
          token,
          newInProgressURI,
        ])
        router.reload()
      } else if (data.status === 'Resolved') {

        const resolvedCaseMetadata = {
          name: `Update for ${caseDetails?.plaintiff?.name} vs ${caseDetails?.defendant?.name}`,
          description: 'Updating Case',
          properties: {
            // @ts-ignore
            ...nft?.metadata?.properties,
            status: data.status,
            description: {
              //@ts-ignore
              new: nft?.metadata?.properties?.caseDescription,
              // @ts-ignore
              inProgress: nft?.metadata?.properties?.description.inProgress,
              resolved: data.description,
            },
            documents: {
              //@ts-ignore
              new: nft?.metadata?.properties?.additionalDocuments,
              // @ts-ignore
              inProgress: nft?.metadata?.properties?.documents.inProgress,
              resolved: data.documents,
            }
          }
        }
        console.log('resolvedCaseMetadata', resolvedCaseMetadata)
        const newResolvedURI = await sdk!.storage.upload(resolvedCaseMetadata)
        const updateNFT = await FIRCollection!.call("setTokenURI", [
          token,
          newResolvedURI,
        ])
        router.reload()
      }
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="" variant="outline">Update Case</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[535px]">
        <DialogHeader>
          <DialogTitle>
            <p className='text-2xl text-center text-primary'>Update Case</p>
            <p className="text-sm text-slate-700 text-center">{caseDetails?.caseId}</p>
          </DialogTitle>
          <DialogDescription>
            Enter relevant details to update the case
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className=' text-sm space-y-2'>
            <div className='flex flex-col space-y-1'>
              <label className="form-label" htmlFor='documents'>
                Documents
              </label>
              <input
                {...register('documents', { required: true })}
                id='documents'
                type='file'
                className='form-input'
              />
              {errors.documents && <p className='text-red-500 -my-3'>Documents are required</p>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label className="form-label" htmlFor=''>Update Status:</label>
              <select
                className='form-input'
                {...register('status', { required: true })}
              >
                {caseDetails?.status === 'New' && <option value='In Progress'>In Progress</option>}
                <option value='Resolved'>Resolved</option>
              </select>
              {errors.status && <p className='text-red-500 -my-3'>Status is required</p>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label className="form-label" htmlFor='description'>
                Description
              </label>
              <textarea
                {...register('description', { required: true })}
                rows={3}
                id='description'
                className='form-input'
              ></textarea>
              {errors.description && <p className='text-red-500 -my-3'>Description is required</p>}
            </div>
          </div>
          <DialogFooter>
            <Button className="my-4" type='submit'>Update Case</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
