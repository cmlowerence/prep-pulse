import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content: string;
}

export const MathRenderer = ({ content }: MathRendererProps) => {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Override default elements for custom styling if needed
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-primary" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-6 mb-3 border-b pb-2" {...props} />,
          li: ({node, ...props}) => <li className="my-1" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
