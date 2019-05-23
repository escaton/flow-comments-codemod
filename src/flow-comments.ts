import * as jscodeshift from 'jscodeshift';

function fromSource(source: string) {
    const lines = source.split('\n');
    return (loc: jscodeshift.Node['loc']) => {
        const resLines = lines.slice(loc.start.line - 1, loc.end.line);
        resLines[resLines.length - 1] = resLines[resLines.length - 1].slice(0, loc.end.column);
        resLines[0] = resLines[0].slice(loc.start.column);
        return resLines.join('\n');
    }
}

function stripFlowFromTopComment(node: jscodeshift.Node) {
    if (node.comments) {
        node.comments = node.comments.map(comment => {
            comment.value = comment.value.replace(/^\s*@flow/i, '');
            return comment;
        }).filter(comment => comment.value.trim().length > 0)
    }
}

function flow2comments(file: jscodeshift.FileInfo, api: jscodeshift.API): string {
    const j = api.jscodeshift;
    const sourceByLoc = fromSource(file.source);
    const flowBlockComment = (p) => {
        const comments = p.node.comments ? [...p.node.comments] : [];
        comments.push(j.commentBlock(`:: ${sourceByLoc(p.node.loc)}`, false, true))
        return j.emptyStatement.from({
            comments
        });
    }
    const root = j(file.source)
    const body = root.get().value.program.body;
    if (!body.length) {
        return null;
    }
    stripFlowFromTopComment(body[0]);

    root
        .find(j.Identifier, p => p.optional)
        .forEach(p => {
            delete p.node.optional
            if (p.node.typeAnnotation) {
                (p.node.typeAnnotation as any).$optional = true;
            } else {
                p.node.comments = [
                    j.commentBlock('::?', false, true),
                    ...(p.node.comments || [])
                ]
            }
        })

    root
        .find(j.ClassDeclaration, (p) => {
            return p.implements.length > 0;
        })
        .forEach(p => {
            const implementsString = (p.node.implements.map as any)(x => sourceByLoc(x.loc)).join(', ');
            p.node.body.comments = [
                j.commentBlock(`:: implements ${implementsString}`, true, true),
                ...(p.node.body.comments || [])
            ];
            delete p.node.implements
        })

    root
        .find(j.ClassProperty, ({ typeAnnotation, value }) => {
            return typeAnnotation !== null && value === null
        })
        .replaceWith(flowBlockComment)

    root
        .find(j.TypeAnnotation)
        .replaceWith((p) => {
            if ((p.node as any).$optional) {
                return j.commentBlock(`::?${sourceByLoc(p.node.loc)}`)
            } else {
                return j.commentBlock(sourceByLoc(p.node.loc))
            }
        });

    root
        .find(j.ImportDeclaration, ({importKind}) => ['type', 'typeof'].includes(importKind))
        .replaceWith(flowBlockComment);

    root
        .find(j.ExportNamedDeclaration, ({exportKind}) => ['type'].includes(exportKind))
        .replaceWith(flowBlockComment);

    root
        .find(j.TypeAlias)
        .replaceWith(flowBlockComment);

    root
        .find(j.TypeParameterDeclaration)
        .replaceWith(flowBlockComment);

    root
        .find(j.TypeParameterInstantiation)
        .replaceWith(flowBlockComment);

    root
        .find(j.OpaqueType)
        .replaceWith(flowBlockComment);

    root
        .find(j.InterfaceDeclaration)
        .replaceWith(flowBlockComment);

    return root.toSource();
};

const parser = 'babylon';
flow2comments.parser = parser;
export default flow2comments
export {parser};