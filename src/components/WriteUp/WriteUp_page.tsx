import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import chessgameMd from './404CTF/Web_wu/chessgame.md?raw';
import rainbowrocketMd from './404CTF/Web_wu/rainbowrocket.md?raw';

// Importation des images de chessgame
import firstScreenImg from '../img/img_chessgame/First_Screen_ChessGame.png';
import secondeScreenImg from '../img/img_chessgame/Seconde_Screen_ChessGame.png';
import thirdScreenImg from '../img/img_chessgame/Third_Screen_ChessGame.png';


// Importation des images de rainbowrocket
import change_jwt_payload_rr from '../img/img_rainbowrocket/change_jwt_payload.png';
import get_flag_rr from '../img/img_rainbowrocket/get_flag.png';
import log_burp_suite_rr from '../img/img_rainbowrocket/img connexion burp suite.png';
import img1_rr from '../img/img_rainbowrocket/img1.png';
import JWT_analyse_rr from '../img/img_rainbowrocket/JWT_analyse.png';
import register_img_rr from '../img/img_rainbowrocket/register_img.png';


interface FileStructure {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileStructure[];
}

const WriteUp_page = () => {
  const [fileStructure, setFileStructure] = useState<FileStructure[]>([]);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const navigate = useNavigate();
  // Fonction pour remplacer les références d'images dans le markdown
  const processMarkdown = (content: string) => {
    return content
      // Images chessgame (format standard markdown)
      .replace(/!\[first img\]\(\.\.\/\.\.\/\.\.\/img\/img_chessgame\/First_Screen_ChessGame\.png\)/g, '![first img](/first-screen)')
      .replace(/!\[seconde img\]\(\.\.\/\.\.\/\.\.\/img\/img_chessgame\/Seconde_Screen_ChessGame\.png\)/g, '![seconde img](/seconde-screen)')
      .replace(/!\[third img\]\(\.\.\/\.\.\/\.\.\/img\/img_chessgame\/Third_Screen_ChessGame\.png\)/g, '![third img](/third-screen)')
      
      // Images rainbowrocket (format Obsidian [[]])
      .replace(/!\[\[register_img\.png\]\]/g, '![register_img](/register_img_rr)')
      .replace(/!\[\[img connexion burp suite\.png\]\]/g, '![img connexion burp suite](/log_burp_suite)')
      .replace(/!\[\[JWT_analyse\.png\]\]/g, '![JWT_analyse](/jwt_analyse)')
      .replace(/!\[\[change_jwt_payload\.png\]\]/g, '![change_jwt_payload](/change_jwt_payload)')
      .replace(/!\[\[get_flag\.png\]\]/g, '![get_flag](/get_flag)');
  };

  useEffect(() => {
    // Structure statique basée sur vos fichiers existants
    const structure = [
      {
        name: '404CTF',
        type: 'folder' as const,
        children: [
          {
            name: 'Web_wu',
            type: 'folder' as const,
            children: [
              { 
                name: 'chessgame.md', 
                type: 'file' as const,
                content: chessgameMd
              },
              {
                name: 'rainbowrocket.md',
                type: 'file' as const,
                content: rainbowrocketMd
              }
            ]
          }
        ]
      }
    ];
    setFileStructure(structure);
    
    // Développer par défaut le dossier 404CTF
    setExpandedFolders(new Set(['/404CTF']));
  }, []);

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileClick = (file: FileStructure) => {
    if (file.content) {
      setMarkdownContent(processMarkdown(file.content));
    }
  };

  const renderFileStructure = (items: FileStructure[], currentPath: string = '') => {
    return items.map((item) => {
      const fullPath = `${currentPath}/${item.name}`;
      
      if (item.type === 'folder') {
        const isExpanded = expandedFolders.has(fullPath);
        
        return (
          <div key={fullPath}>
            <div 
              className="cursor-pointer py-2 px-2 rounded hover:bg-zinc-800"
              onClick={() => toggleFolder(fullPath)}
            >
              <div className="text-white flex items-center gap-2">
                <span className="text-xl">
                  {isExpanded ? '📂' : '📁'}
                </span>
                {item.name}
              </div>
            </div>
            {isExpanded && item.children && (
              <div className="ml-4">
                {renderFileStructure(item.children, fullPath)}
              </div>
            )}
          </div>
        );
      }

      return (
        <div 
          key={fullPath}
          className="flex flex-end py-2 px-4 ml-6 cursor-pointer text-gray-300 hover:bg-zinc-800 hover:rounded"
          onClick={() => handleFileClick(item)}
        >
          📄 {item.name}
        </div>
      );
    });
  };

  const handleReturn = () => {
    navigate('/');
  };

  // Fonction pour obtenir l'image correspondante à la source spécifiée
  const getImageSrc = (src: string) => {
    if (src === '/first-screen') return firstScreenImg;
    if (src === '/seconde-screen') return secondeScreenImg;
    if (src === '/third-screen') return thirdScreenImg;

    if( src === '/change_jwt_payload') return change_jwt_payload_rr;
    if( src === '/get_flag') return get_flag_rr;
    if( src === '/log_burp_suite') return log_burp_suite_rr;
    if( src === '/img1_rr') return img1_rr;
    if( src === '/jwt_analyse') return JWT_analyse_rr;
    if( src === '/register_img_rr') return register_img_rr;

    return src;
  };

  return (
    <div className="w-screen min-h-screen text-white overflow-x-hidden fixed inset-0 z-50">
      {/* Bouton retour */}
      <button 
        onClick={handleReturn}
        className="absolute top-4 left-4 bg-transparent border border-white text-white px-4 py-2 rounded text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-black z-50"
      >
        ← Retour
      </button>

      <div className="pt-16 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Mes Write-ups</h1>
        
        <div className="container mx-auto px-4 sm:px-8 max-w-6xl w-full">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="md:w-1/3">
              <div className="bg-[#1e1e1e] rounded-lg p-4 mb-8">
                {renderFileStructure(fileStructure)}
              </div>
            </div>

            <div className="md:w-2/3">
              {markdownContent ? (
                <div className="bg-[#1a1a1a] p-4 sm:p-8 rounded-lg shadow-md">
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown components={{
                      h1: ({...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 pb-2 border-b border-gray-700" {...props} />,
                      h2: ({...props}) => <h2 className="text-xl font-bold mt-6 mb-3" {...props} />,
                      h3: ({...props}) => <h3 className="text-lg font-bold mt-5 mb-2" {...props} />,
                      p: ({...props}) => <p className="my-4 text-gray-300 leading-relaxed" {...props} />,
                      ul: ({...props}) => <ul className="list-disc my-4 pl-8 text-left" {...props} />,
                      ol: ({...props}) => <ol className="list-decimal my-4 pl-8 text-left" {...props} />,
                      li: ({...props}) => <li className="my-1 text-left" {...props} />,
                      code: ({className, children, ...props}) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const isInline = !match && (className || '').indexOf('inline') !== -1;
                        return isInline 
                          ? <code className="bg-[#2d2d2d] px-1 py-0.5 rounded text-gray-300 font-mono text-sm" {...props}>{children}</code>
                          : <pre className="block bg-[#2d2d2d] p-4 rounded overflow-x-auto my-4">
                              <code className="font-mono text-sm" {...props}>{children}</code>
                            </pre>;
                      },
                      img: ({src, ...props}) => {
                        const imageSrc = getImageSrc(src || '');
                        return <img className="max-w-full h-auto rounded my-4" src={imageSrc} {...props} />
                      },
                      a: ({...props}) => <a className="text-blue-400 hover:text-blue-300 hover:underline" {...props} />,
                      blockquote: ({...props}) => <blockquote className="border-l-4 border-gray-700 pl-4 my-4 italic text-gray-400" {...props} />,
                      hr: ({...props}) => <hr className="my-6 border-gray-700" {...props} />,
                    }}>
                      {markdownContent}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 mt-20">
                  <p>Sélectionnez un write-up dans l'explorateur de fichiers</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteUp_page;
