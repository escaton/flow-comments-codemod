import * as jscodeshift from 'jscodeshift';

function fromSource(source) {
    const lines = source.split('\n');
    return (loc) => {
        const resLines = lines.slice(loc.start.line - 1, loc.end.line);
        resLines[resLines.length - 1] = resLines[resLines.length - 1].slice(0, loc.end.column);
        resLines[0] = resLines[0].slice(loc.start.column);
        return resLines.join('\n');
    }
}

function stripFlowFromComment(node) {
    if (node.comments) {
        node.comments = node.comments.map(comment => {
            comment.value = comment.value.replace(/\s?@flow/i, '');
            return comment;
        }).filter(comment => comment.value.trim().length)
    } else if (node.commentBlock) {

    }
}

function flow2comments(file: jscodeshift.FileInfo, api: jscodeshift.API, options: jscodeshift.Options): string {
    const j = api.jscodeshift;
    const sourceByLoc = fromSource(file.source);
    const root = j(file.source)
    const body = root.get().value.program.body;
    if (!body.length) {
        return null;
    }
    stripFlowFromComment(body[0]);

    root
        .find(j.TypeAnnotation)
        .replaceWith((p) => {
            return j.commentBlock(sourceByLoc(p.node.loc))
        });

    root
        .find(j.TypeAlias)
        .replaceWith((p) => {
            return j.emptyStatement.from({
                comments: [j.commentBlock(`:: ${sourceByLoc(p.node.loc)}`)]
            });
        });

    return root.toSource();
};

const parser = 'flow';
flow2comments.parser = parser;
export {flow2comments, parser}
export default flow2comments