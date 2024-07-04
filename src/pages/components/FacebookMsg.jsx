'use client';
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
  return (
    <FacebookProvider appId="1198901558189095" chatSupport>
        <CustomChat pageId="295502216985102" minimized={true}/>
      </FacebookProvider>    
  )
}

export default FacebookMsg