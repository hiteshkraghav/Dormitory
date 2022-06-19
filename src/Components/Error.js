import React from 'react';

function Error({err}) {
	if(err && err.length >0)
		return <div data-testid="errorMsg" className="alert error mt-20 slide-up-fade-in">{err}</div>
	return <></>
}

export default Error;
