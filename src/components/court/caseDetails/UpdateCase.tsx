import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function UpdateCase({ caseDetails }: { caseDetails: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update Case</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p className='text-xl text-center'>Update Case</p>
            <p>{caseDetails?.caseId}</p>
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className='grid gap-4 py-4 text-sm'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='remark'>
                Remark
              </label>
              <input
                {...register('remark', { required: true })}
                id='remark'
                className='form-input'
              />
            </div>
            {errors.remark && <p className='text-red-500 -my-3'>Remark is required</p>}
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='documents'>
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
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor=''>Update Status:</label>
              <select
                className='form-input'
                {...register('status', { required: true })}
              >
                {selectedStatus === 'New' && <option value='Pending'>Pending</option>}
                <option value='Resolved'>Resolved</option>
              </select>
              {errors.status && <p className='text-red-500 -my-3'>Status is required</p>}
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='description'>
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
            <Button type='submit'>Update FIR</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
