import { createRouteHandler } from "uploadthing/next-legacy";
 
import { ourFileRouter } from '../../../server/uploadThing'
 
export default createRouteHandler({
  router: ourFileRouter,
  config: { 
    // allow pdfs
  },
});