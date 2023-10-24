import json

def solve(model, data, obj):
    stack = {}

    def stack_flush():
        for s in data['stack']:
            stack[s['id']] = []

    def stack_result(id, result, score):
        result['score'] = score
        stack[id].append(result)

    class Node():
        def __init__(self, graph, depth = 0):
            self.type = graph['type']
            self.graph = graph
            self.nodes = []
            self.depth = depth
            self.score = 0
            
            try:
                self.stack = graph['stack']
            except:
                self.stack = None
            
            try:
                self.comment = graph['comment']
            except:
                self.comment = None

            try:
                for g in graph['graph']:
                    self.nodes.append(Node(g, depth + 1))
            except:
                pass


            match self.type:
                case 'condition':
                    self.statements = graph['statements']
                case 'report':
                    self.report = graph['report']

        def debug_trace(self, trace = []):
            trace.append(self)
            for node in self.nodes:
                node.debug_trace(trace)

            return trace
        
        def debug_info(self):
            return {
                'node_count': len(self.nodes), 
                'depth': self.depth,
                'type': self.type
            }
        
        def debug_tree(self):
            for n in self.debug_trace():
                info = n.debug_info()
                print('     ' * n.depth + str(info))

        def execute_condition(self):
            true_count = 0
            global_score = 0

            for statement in self.statements:
                try:
                    st_score = statement['score']
                except:
                    st_score = 0


                if statement['param'] in obj:
                    if obj[statement['param']] is not None:
                        values = []
                        if type(statement['value']) is not list:
                            values.append(statement['value'])
                        else:
                            values = statement['value']
                        
                        for dst in values:
                            ost = obj[statement['param']]

                            match statement['predicate']:
                                case '>':
                                    if float(ost) > float(dst):
                                        true_count += 1
                                        global_score += st_score
                                case '<':
                                    if float(ost) < float(dst):
                                        true_count += 1
                                        global_score += st_score
                                case '=':
                                    if ost == dst:
                                        true_count += 1
                                        global_score += st_score
                                case '>=':
                                    if float(ost) >= float(dst):
                                        true_count += 1
                                        global_score += st_score
                                case '<=':
                                    if float(ost) <= float(dst):
                                        true_count += 1
                                        global_score += st_score
                                case '!=':
                                    if float(ost) != float(dst):
                                        true_count += 1
                                        global_score += st_score
                                case _:
                                    pass
                    else:
                        if not statement['require']:
                            true_count += 1
            
            if true_count > 0:
                self.execute_nodes(global_score + self.score)

        def execute(self, score = 0):
            self.score = score

            match self.type:
                case 'report':
                    if 'requireScore' in self.report:
                        if self.report['requireScore'] <= self.score:
                            stack_result(self.stack, self.report, self.score)
                            self.execute_nodes(self.score)
                    else:
                        stack_result(self.stack, self.report, self.score)
                        self.execute_nodes(self.score)
                case 'condition':
                    self.execute_condition()
        
        def execute_nodes(self, score):
            for n in self.nodes:
                n.execute(score)

    stack_flush()

    for i in data['graph']:
        n = Node(i)
        n.debug_tree()
        n.execute()

    result = json.dumps(stack, indent=4, ensure_ascii=False)

    return result
