package com.rt.core.thread;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorTask {

	List<ExecutorService> executors = new ArrayList<>();

	int threadNum;
	
	public ExecutorTask() {
		threadNum = Runtime.getRuntime().availableProcessors() * 2;
		for (int i = 0; i < threadNum; i++) {
			ExecutorService singleThreadExecutor = Executors.newSingleThreadExecutor();
			executors.add(singleThreadExecutor);
		}
	}
	
	public void execute(Task task) {
		long paraId = task.getParaId();
		int num = (int) (paraId % threadNum);
		executors.get(num).execute(task);;
	}

	public void shutDown() {
		for (int i = 0; i < executors.size(); i++) {
			executors.get(i).shutdown();
		}
	}
}
