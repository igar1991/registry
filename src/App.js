import './App.css';
import FileBrowser, {Icons} from "react-keyed-file-browser";
import {useEffect, useState} from "react";
import logo from './FDS_logo_transparent.png';

function App() {
    const [files, setFiles] = useState([]);
    const [currentFile, setCurrentFile] = useState(null);

    const getFileName = path => {
        if (!path) {
            return '';
        }

        const parts = path.split('/');

        return parts[parts.length - 1]
    }

    const getReferenceTypeName = type => {
        const types = {'swarm': 'Swarm', 'fairos-dfs': 'FairOS-dfs'};
        if (types[type]) {
            return types[type]
        } else {
            return 'Unknown type';
        }
    }

    useEffect(() => {
        async function run() {
            let data = await (await fetch('files.json')).json();
            setFiles(data)
        }

        run().then();
    }, []);

    return (
        <>
            <div className="App">
                <nav className="navbar navbar-light bg-light" style={{
                    background: 'linear-gradient(to right, rgba(140, 209, 168, 0.588235), rgba(140, 209, 168, 0.3))'
                }}>
                    <div className="container-fluid">
                        <a className="navbar-brand display-1" href="/">
                            <img src={logo} alt="" height={60} width={136} className="d-inline-block align-middle"/>
                            &nbsp;<span className="mt-3 text-break align-middle display-5 d-none d-sm-inline">Liberate Data Directory</span>
                        </a>
                    </div>
                </nav>

                <div className="row m-3">
                    <div>
                        <p> Liberate Data Directory is a compilation of references to public data stored on decentralized
                            storage.
                        </p>

                        <p> References are provided through community efforts and Fair Data Society offers no guarantees
                            about availability of the data or that the content of the data or its licensing is
                            appropriate for any particular use case.
                        </p>

                        <p> Join the <a target="_blank"
                                                 href="https://discord.gg/KrVTmahcUA">Fair Data Society Discord</a> and use the #liberate-data-directory channel to gain more information and support.
                        </p>

                        <p>
                            <strong>Directory <a target="_blank"
                                                 href="https://github.com/fairDataSociety/fairOS-dfs">FairOS</a> reference</strong>: <span
                            className="text-break">5bb2cd9d685a7d98866eb00782a29ec9e8d0384210b455497c29382e85493edc</span>
                        </p>
                    </div>

                    <div className="col-8">
                        <FileBrowser
                            canFilter={true}
                            icons={Icons.FontAwesome(4)}
                            onSelectFile={e => {
                                console.log(e);
                                setCurrentFile(e);
                            }}
                            detailRenderer={(e) => {
                                return <></>;

                            }}
                            files={files}
                        />
                    </div>
                    <div className="col-4 App-file-info">
                        <p>
                            <strong>File information</strong>
                        </p>

                        {!currentFile && <p>...</p>}
                        {currentFile && <div>
                            <p><strong>Name</strong>: {getFileName(currentFile.key)}</p>

                            <p><strong>Reference
                                type</strong>: {getReferenceTypeName(currentFile['reference-type'])}</p>

                            <p className="text-break">
                                <strong>Reference</strong>: {currentFile['reference-type'] === 'swarm' ?
                                <a target="_blank"
                                   href={`https://bee-9.gateway.ethswarm.org/bzz/${currentFile.reference}/`}>{currentFile.reference}</a> :
                                currentFile.reference}</p>

                            {currentFile.description && <p>
                                <strong>Description</strong>:&nbsp;{currentFile.description}
                            </p>}

                            {currentFile.license && <p>
                                <strong>License</strong>: {currentFile.license}
                            </p>}
                        </div>}
                    </div>
                </div>
            </div>

            <footer className="text-center footer mt-auto py-3 bg-light">
                <div className="container">
                    <span className="text-muted">From <a href="https://fairdatasociety.org/">Fair Data Society</a> with ❤️</span>
                    <br/>
                    <span className="text-muted">
                        <a target="_blank"
                           href="https://github.com/fairDataSociety/registry">Github</a>
                    </span>
                </div>
            </footer>
        </>
    );
}

export default App;
